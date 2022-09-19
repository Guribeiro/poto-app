import { combineReducers } from 'redux';

import authentication from './authentication';
import posts from './posts';

export default combineReducers({
  authentication,
  posts
});
