import { ActionTypes } from '../constants/action-types';

const initialState = {
  userToken: '',
  clickDate: '',
  clickedDate: '',
  addEvent: {},
  userInfos: {},
  calendarInfos: [],
  clickedHistoryRedux: {},
  allUsers: {},
  loading: true,
};
const allInfosTask = {
  tasksAll: [],
};
export const aunthUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_AUNTIFICATED:
      // return { ...state, userToken: payload, loading: false };
      return { userToken: payload };
    default:
      return state;
  }
};
// export const UserINFOS = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case ActionTypes.USER_INFOS:
//       // return { ...state, userToken: payload, loading: false };
//       return { ...state, userInfos: payload };
//     default:
//       return state;
//   }
// };
export const clickDateUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_CLICK_DATE:
      return { ...state, clickDate: payload };
    case ActionTypes.USER_CLICKED_DATE:
      return { ...state, clickedDate: payload };
    case ActionTypes.USER_ADD_EVENT:
      return { ...state, addEvent: payload };
    case ActionTypes.USER_INFOS:
      // return { ...state, userToken: payload, loading: false };
      return { ...state, userInfos: payload };
    case ActionTypes.CALENDAR_INFOS:
      return { ...state, calendarInfos: payload };
    case ActionTypes.HANDLE_HISTORYS:
      return { ...state, clickedHistoryRedux: payload };
    case ActionTypes.ALL_USERS:
      return { ...state, allUsers: payload };
    default:
      return state;
  }
};

export const allTasks = (state = allInfosTask, { type, payload }) => {
  switch (type) {
    case ActionTypes.ALL_INFOS_TASKS:
      return { ...state, tasksAll: payload };

    default:
      return state;
  }
};
