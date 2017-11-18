import {
  USERS_ME,
  USERS_LOGIN,
  USERS_REGISTER,
  USERS_LOGOUT,
  USERS,
  USERS_UPDATE_ROLES,
} from '@/http/apis';
import * as http from '@/http';
import { sha256 } from '@/helpers/crypto';
import {
  setType,
  genPassword,
} from '@/helpers/utils';
import {
  USER_INFO,
} from '@/store/mutation-types';

const moduleName = 'user';
const type = setType(moduleName);

const state = {
  info: null,
};

const mutations = {
  [type(USER_INFO)](state, data) {
    state.info = data;
  },
};


const userGet = async ({ commit }) => {
  const res = await http.get(USERS_ME)
    .noCache();
  commit(type(USER_INFO), res.body);
};

const userLogin = async ({ commit }, { account, password }) => {
  let res = await http.get(USERS_LOGIN)
    .noCache();
  const token = res.body.token;
  const code = sha256(genPassword(account, password) + token);
  res = await http.post(USERS_LOGIN, {
    account,
    password: code,
  });
  commit(type(USER_INFO), res.body);
  return res;
};

const userRegister = async ({ commit }, { account, password, email }) => {
  const res = await http.post(USERS_REGISTER, {
    account,
    password: genPassword(account, password),
    email,
  });
  commit(type(USER_INFO), res.body);
  return res;
};

const userLogout = async ({ commit }) => {
  const res = await http.del(USERS_LOGOUT)
    .noCache();
  commit(type(USER_INFO), {
    anonymous: true,
  });
  return res;
};

const userList = async () => {
  const res = await http.get(USERS)
    .noCache();
  return res;
};

const userUpdateRoles = async (tmp, { id, roles }) => {
  const url = USERS_UPDATE_ROLES.replace(':id', id);
  const res = await http.patch(url)
    .send({
      roles,
    });
  return res;
};

export const actions = {
  userGet,
  userLogin,
  userRegister,
  userLogout,
  userList,
  userUpdateRoles,
};

export default {
  state,
  mutations,
};
