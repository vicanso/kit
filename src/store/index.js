import Vue from 'vue';
import Vuex from 'vuex';

import actions from '@/store/action';
import mutations from '@/store/mutation';

Vue.use(Vuex);

const state = {
  // 用户信息
  userInfo: null,
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
