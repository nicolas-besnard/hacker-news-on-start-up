import axios from 'axios';
import moment from 'moment';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const fetchArticles = (numberOfArticles = 20) => (response) => {
  return response.data.slice(0, numberOfArticles).map(value => {
    return axios.get(`${BASE_URL}/item/${value}.json`);
  });
};

const fetchArticlesContent = (articles) => {
  return axios
    .all(articles)
    .then(axios.spread((...requests) => {
      return requests.map((request) => {
        const {
          id,
          title,
          url
        } = request.data;

        return {
          id,
          title,
          url
        };
      });
    }));
};

const dispatchArticles = (dispatch) => (articles) => {
  dispatch(receiveArticles(articles));
};

const requestArticles = (force = false) => {
  return (dispatch, state) => {
    const lastUpdated = state().lastUpdated;

    if (force || lastUpdated === null || (moment(new Date()) >= moment(lastUpdated).add(30, 'minutes'))) {
      dispatch({ type: REQUEST_ARTICLES });

      return axios.get(`${BASE_URL}/topstories.json`)
        .then(fetchArticles())
        .then(fetchArticlesContent)
        .then(dispatchArticles(dispatch));
    }
  };
};

const receiveArticles = (json) => {
  return {
    type: RECEIVE_ARTICLES,
    articles: json,
    receivedAt: new Date()
  };
};

export {
  requestArticles
};
