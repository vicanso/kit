import _ from 'lodash';
import {
  LANGS,
  LANGS_UPDATE,
  LANGS_CATEGORIES,
} from '@/http/apis';
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
  zh: {
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

// 获取多语言配置(只返回单一语言配置)
const langList = async ({ commit }, category) => {
  let catList = category;
  if (!_.isArray(catList)) {
    catList = [category];
  }
  catList = _.filter(catList, cat => !state[cat]);
  if (catList.length === 0) {
    return null;
  }
  const res = await http.get(`${LANGS}/lang`)
    .query({
      category: catList,
    });
  commit(type(LANG_LIST), res.body);
  return res;
};

// 获取多语言配置的分类
const langListCategory = async () => {
  const res = await http.get(LANGS_CATEGORIES);
  return res;
};

// 获取多语言配置的原始配置
const langListOriginal = async (tmp, category) => {
  const res = await http.get(LANGS)
    .query({
      category,
    });
  return res;
};


// 更新多语言配置
const langUpdate = async (tmp, { id, data }) => {
  const res = await http.patch(LANGS_UPDATE.replace(':id', id))
    .send(data);
  return res;
};

// 增加多语言配置
const langAdd = async (tmp, data) => {
  const res = await http.post(LANGS)
    .send(data);
  return res;
};


export const actions = {
  langList,
  langListCategory,
  langListOriginal,
  langUpdate,
  langAdd,
};

export default {
  state,
  mutations,
};
