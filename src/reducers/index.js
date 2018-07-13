import { combineReducers } from 'redux';

import articles from './articles';
import articleIds from './articleIds';
import isFetching from './isFetching';
import lastUpdated from './lastUpdated';

export default combineReducers({
  articles,
  articleIds,
  isFetching,
  lastUpdated
});
