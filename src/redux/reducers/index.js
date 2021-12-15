import { combineReducers } from 'redux';
import { aunthUser, clickDateUser } from './productReduser';

const redusers = combineReducers({
  user: aunthUser,
  userAction: clickDateUser,
});

export default redusers;
