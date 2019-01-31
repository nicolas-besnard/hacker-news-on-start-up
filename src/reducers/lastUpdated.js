import {RECEIVE_ARTICLES} from '../actions'

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.receivedAt
    default:
      return state
  }
}
