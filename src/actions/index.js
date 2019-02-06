import axios from 'axios'
import { addMinutes } from 'date-fns'

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

const requestArticles = (force = false) => async({lastUpdated, articles: knownArticles}) => {
  const now = new Date()
  const updated30MinsAgo = now >= addMinutes(lastUpdated, 30)

  if (force || lastUpdated === null || updated30MinsAgo) {
    const knownArticleIds = Object.keys(knownArticles).map(articleId =>
      parseInt(articleId, 10),
    )

    const response = await axios.get(`${BASE_URL}/topstories.json`)
    const data = await response.data
    const newArticleIds = await data.slice(0, ARTICLES_PER_PAGE)

    return Promise.resolve(filterKnownArticles(knownArticleIds)(newArticleIds))
      .then(fetchArticles)
      .then(fetchArticlesContent)
      .then(removeArticles(newArticleIds, knownArticles))
  }
}

export {requestArticles}
