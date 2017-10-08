import { RECEIVE_ARTICLES } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.articles;
    default:
      return state;
  }
};
