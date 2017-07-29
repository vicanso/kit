import * as userService from '@/services/user';
import {
  USER_INFO,
} from '@/constants/mutation-type';

export default {
  async getUserInfo({ commit }) {
    const res = await userService.me();
    commit(USER_INFO, res);
  },
  async userLogin({ commit }, data) {
    const res = await userService.login(data);
    commit(USER_INFO, res);
  },
  async userRegister({ commit }, data) {
    const res = await userService.register(data);
    commit(USER_INFO, res);
  },
};
