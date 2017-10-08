import { combineReducers } from 'redux';

import articles from './articles';
import isFetching from './isFetching';
import lastUpdated from './lastUpdated';

export default combineReducers({
  articles,
  isFetching,
  lastUpdated
});
