import { RECEIVE_ARTICLES_ORDER } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES_ORDER:
      return action.articleIds;
    default:
      return state;
  }
}
