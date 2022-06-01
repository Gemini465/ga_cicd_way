const api_host = '//localhost:8090';

export const ws_host = 'ws://localhost:8888';

export const public_salt = 'public_salt';

export default {
  login: `${api_host}/login`,
  addUser: `${api_host}/addUser`,
  deleteUser: `${api_host}/deleteUser`,
  updateUser: `${api_host}/updateUser`,
  findUser: `${api_host}/userService/userList`,
};
