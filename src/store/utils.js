import globals from '@/helpers/globals';
import { sha256 } from '@/helpers/crypto';


// eslint-disable-next-line
export const setType = moduleName => mutationName => `${moduleName}/${mutationName}`;

export const genPassword = (account, password) => {
  const pwd = sha256(password);
  const app = globals.get('CONFIG.app', 'unknown');
  return sha256(`${account}-${pwd}-${app}`);
};
