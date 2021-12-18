import { ActionTypes } from '../constants/action-types';

export const LogInUser = (user) => {
  return {
    type: ActionTypes.USER_AUNTIFICATED,
    payload: user,
  };
};
export const HandleClickDateUser = (date) => {
  return {
    type: ActionTypes.USER_CLICK_DATE,
    payload: date,
  };
};
export const HandleClickDate = (date) => {
  return {
    type: ActionTypes.USER_CLICKED_DATE,
    payload: date,
  };
};
export const AddEvent = (data) => {
  return {
    type: ActionTypes.USER_ADD_EVENT,
    payload: data,
  };
};
export const UserInfosLogIn = (data) => {
  return {
    type: ActionTypes.USER_INFOS,
    payload: data,
  };
};
export const CalendarInfos = (data) => {
  return {
    type: ActionTypes.CALENDAR_INFOS,
    payload: data,
  };
};
export const HandleHistory = (data) => {
  return {
    type: ActionTypes.HANDLE_HISTORYS,
    payload: data,
  };
};
export const HandleAllUsers = (data) => {
  return {
    type: ActionTypes.ALL_USERS,
    payload: data,
  };
};
export const AllInfosTaskCalendar = (data) => {
  return {
    type: ActionTypes.ALL_INFOS_TASKS,
    payload: data,
  };
};
