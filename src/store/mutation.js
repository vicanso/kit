import {
  USER_INFO,
} from '@/constants/mutation-type';

/* eslint no-param-reassign:0 */
export default {
  // 用户信息
  [USER_INFO](state, userInfo) {
    state.userInfo = { ...userInfo };
  },
};
