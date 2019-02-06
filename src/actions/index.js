import axios from 'axios'
import { addMinutes } from 'date-fns'

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const RECEIVE_ARTICLES_ORDER = 'RECEIVE_ARTICLES_ORDER'
export const ARTICLES_PER_PAGE = 20

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

const fetchArticles = articleIds => {
  return articleIds.map(articleId =>
    axios.get(`${BASE_URL}/item/${articleId}.json`),
  )
}

const filterKnownArticles = knownArticleIds => newArticleIds =>
  newArticleIds.filter(articleId => !knownArticleIds.includes(articleId))

const fetchArticlesContent = articles => {
  return axios.all(articles).then(
    axios.spread((...requests) =>
      requests.map(request => {
        const {id, title, url} = request.data

        return {
          id,
          title,
          url,
        }
      }),
    ),
  )
}

const removeArticles = (newArticleIds, knownArticles) => newArticles =>
  newArticleIds.reduce((acc, newArticleId) => {
    const knownArticle = knownArticles[newArticleId]

    if (knownArticle) {
      acc.push(knownArticle)
    } else {
      const newArticle = newArticles.find(
        article => article.id === newArticleId,
      )

      acc.push(newArticle)
    }

    return acc
  }, [])

const dispatchArticles = dispatch => articles => {
  dispatch(receiveArticles(articles))
}

const dispatchArticlesOrder = dispatch => articleIds => {
  dispatch(receiveArticlesOrder(articleIds))

  return articleIds
}

const requestArticles = (force = false) => async(dispatch, state) => {
  const {lastUpdated, articles: knownArticles} = state()

  const now = new Date()
  const updated30MinsAgo = now >= addMinutes(lastUpdated, 30)

  if (force || lastUpdated === null || updated30MinsAgo) {
    dispatch({type: REQUEST_ARTICLES})

    const knownArticleIds = Object.keys(knownArticles).map(articleId =>
      parseInt(articleId, 10),
    )

    const response = await axios.get(`${BASE_URL}/topstories.json`)
    const data = await response.data
    const newArticleIds = await data.slice(0, ARTICLES_PER_PAGE)

    dispatchArticlesOrder(dispatch)(newArticleIds)
    Promise.resolve(filterKnownArticles(knownArticleIds)(newArticleIds))
      .then(fetchArticles)
      .then(fetchArticlesContent)
      .then(removeArticles(newArticleIds, knownArticles))
      .then(dispatchArticles(dispatch))
  }
}

const receiveArticlesOrder = articleIds => ({
  type: RECEIVE_ARTICLES_ORDER,
  articleIds,
})

const receiveArticles = json => {
  return {
    type: RECEIVE_ARTICLES,
    articles: json,
    receivedAt: new Date(),
  }
}

export {requestArticles}
