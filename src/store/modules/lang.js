import _ from 'lodash';
import { LANGS } from '@/http/apis';
import * as http from '@/http';
import { setType } from '@/store/utils';
import {
  LANG_LIST,
} from '@/store/mutation-types';
import globals from '@/helpers/globals';

const moduleName = 'lang';
const type = setType(moduleName);

const common = {
  en: {
    loading: 'loading...',
    confirm: 'confirm',
    cancel: 'cancel',
    httpAborted: 'The request is timeout, please try again later',
  },
  cn: {
    loading: '正在加载……',
    confirm: '确认',
    cancel: '取消',
    httpAborted: '请求超时，请稍候再试',
  },
};

const state = {
  user: null,
  basic: null,
  common: common[globals.get('CONFIG.lang')],
};

const mutations = {
  [type(LANG_LIST)](state, data) {
    _.forEach(data, (value, key) => {
      state[key] = value;
    });
  },
};

const langList = async ({ commit }, category) => {
  let catList = category;
  if (!_.isArray(catList)) {
    catList = [category];
  }
  catList = _.filter(catList, cat => !state[cat]);
  if (catList.length === 0) {
    return;
  }
  const res = await http.get(LANGS)
    .query({
      category: catList,
    });
  commit(type(LANG_LIST), res.body);
};


export const actions = {
  langList,
};

export default {
  state,
  mutations,
};
