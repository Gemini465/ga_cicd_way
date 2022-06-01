import registerServer from '@/utils/registerServer';
import api from '@/utils/api';

const { login, addUser, deleteUser, updateUser, findUser } = api;

const userService = registerServer({
  login: { url: login, method: 'post' },
  addUser: { url: addUser, method: 'post' },
  deleteUser: { url: deleteUser, method: 'delete' },
  updateUser: { url: updateUser, method: 'put' },
  findUser: { url: findUser, method: 'get' },
});

export default userService;
