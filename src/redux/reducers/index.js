import { combineReducers } from 'redux';
import { allTasks, aunthUser, clickDateUser } from './productReduser';

const redusers = combineReducers({
  user: aunthUser,
  userAction: clickDateUser,
  alltasks: allTasks,
});

export default redusers;
