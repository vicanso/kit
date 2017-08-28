/**
 * 通过 `@/store/index.js` 一次性引入所有 vuex modules, actions, getters
 */

const files = require.context('.', false, /\.js$/);
const modules = {};
const actions = {};
const getters = {};

files.keys().forEach((key) => {
  if (key === './index.js') return;

  const vuexObj = files(key);

  modules[key.replace(/(\.\/|\.js)/g, '')] = vuexObj.default;

  if (vuexObj.actions) Object.assign(actions, vuexObj.actions);
  if (vuexObj.getters) Object.assign(getters, vuexObj.getters);
});

export default {
  actions,
  getters,
  modules,
};
