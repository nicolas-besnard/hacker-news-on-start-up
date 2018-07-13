import { RECEIVE_ARTICLES } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.articles.reduce((acc, h) => { acc[h.id] = h; return acc }, {}) ;
    default:
      return state;
  }
};

export const getArticle = (state, id) => {
  return state[id]
}
