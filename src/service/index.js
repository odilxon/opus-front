// export const globalURL = 'http://192.168.42.200:5000/';
export const globalURL = 'http://10.104.50.9:1234/';
// export const globalURL = 'https://agroijroapi.herokuapp.com/';
export const LoginUrl = `${globalURL}login`;
export const GetUserInfoUrl = `${globalURL}user`;
export const AllUSerUrl = `${globalURL}user/users`;
export const GetUserDateClickUrl = `${globalURL}user/tasks`;
export const CdataUrl = `${globalURL}user/c_data`;
export const NewPassUrl = `${globalURL}newpass`;
export const ADDEventUrl = `${globalURL}user/task/add_event`;
export const TaskAddUrl = `${globalURL}user/task/add`;
export const AdminChekUrl = `${globalURL}user/task/validate`;
export const UserAddUrl = `${globalURL}user/add`;
export const TaskEditUrl = `${globalURL}user/task/edit`;
// export const PostPhotoUrl = `${globalURL}/`;

export const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};
