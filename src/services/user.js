import globals from '@/helpers/globals';
import * as request from '@/helpers/request';
import * as crypto from '@/helpers/crypto';
import {
  USER_ME,
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from '@/constants/url';

const app = globals.get('CONFIG.app', 'unknown');

/**
 * Get the user info
 * @export
 * @returns
 */
export function me() {
  return request.get(USER_ME)
    .noCache()
    .then(res => res.body);
}

/**
 * Register account
 * @export
 * @param {String} account
 * @param {String} password
 * @param {String} email
 * @returns
 */
export function register(account, password, email) {
  const pwd = crypto.sha256(password);
  const code = crypto.sha256(`${account}-${pwd}-${app}`);
  return request.post(USER_REGISTER, {
    account,
    password: code,
    email,
  }).then(res => res.body);
}

export function login(account, password) {
  return request.get(USER_LOGIN)
    .noCache()
    .then((res) => {
      const token = res.body.token;
      const pwd = crypto.sha256(password);
      const code = crypto.sha256(crypto.sha256(`${account}-${pwd}-${app}`) + token);
      return request.post(USER_LOGIN, {
        account,
        password: code,
      });
    }).then(res => res.body);
}

export function logout() {
  return request.del(USER_LOGOUT)
    .then(res => res.body || {
      account: '',
      anonymous: true,
    });
}
