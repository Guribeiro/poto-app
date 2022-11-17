import { combineReducers } from 'redux';

import feed from './feed';
import posts from './posts';
import authentication from './authentication';

export default combineReducers({
  feed,
  posts,
  authentication
});
