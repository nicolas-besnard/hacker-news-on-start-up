import {RECEIVE_ARTICLES, REQUEST_ARTICLES} from '../actions'

export default (state = false, action) => {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return true
    case RECEIVE_ARTICLES:
      return false
    default:
      return state
  }
}
