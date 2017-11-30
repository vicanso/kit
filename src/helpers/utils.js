import _ from 'lodash';

import globals from '@/helpers/globals';
import { sha256 } from '@/helpers/crypto';


// eslint-disable-next-line
export const setType = moduleName => mutationName => `${moduleName}/${mutationName}`;

export function genPassword(account, password) {
  const pwd = sha256(password);
  const app = globals.get('CONFIG.app', 'unknown');
  return sha256(`${account}-${pwd}-${app}`);
}

export function formatDate(value) {
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
}

// 判断是否支持webp格式
let checkWebpPromise = null;
export async function isSupportWebp() {
  if (checkWebpPromise) {
    return checkWebpPromise;
  }
  const images = {
    basic: 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==',
    lossless: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=',
  };
  const check = data => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = data;
  });
  checkWebpPromise = Promise.all(_.map(images, check)).then(() => true)
    .catch(() => false);
  return checkWebpPromise;
}
