import * as userService from '@/services/user';
import {
  USER_INFO,
} from '@/constants/mutation-type';

export default {
  async getUserInfo({ commit }) {
    const res = await userService.me();
    commit(USER_INFO, res);
  },
};
