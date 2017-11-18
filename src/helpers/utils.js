import _ from 'lodash';

import globals from '@/helpers/globals';
import { sha256 } from '@/helpers/crypto';


// eslint-disable-next-line
export const setType = moduleName => mutationName => `${moduleName}/${mutationName}`;

export const genPassword = (account, password) => {
  const pwd = sha256(password);
  const app = globals.get('CONFIG.app', 'unknown');
  return sha256(`${account}-${pwd}-${app}`);
};

export const formatDate = (value) => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  const fill = v => _.padStart(v, 2, '0');
  const month = fill(date.getMonth() + 1);
  const day = fill(date.getDate());

  const hours = fill(date.getHours());
  const minutes = fill(date.getMinutes());
  const seconds = fill(date.getSeconds());
  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
