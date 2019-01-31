import { combineReducers } from 'redux'
import articleIds from './articleIds'

import articles from './articles'
import isFetching from './isFetching'
import lastUpdated from './lastUpdated'

export default combineReducers({
  articles,
  articleIds,
  isFetching,
  lastUpdated
})
