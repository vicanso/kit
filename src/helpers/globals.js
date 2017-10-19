import _ from 'lodash';

function get(path, defaultValue) {
  // eslint-disable-next-line
  return _.get(window, path, defaultValue);
}

function set(path, value) {
  // eslint-disable-next-line
  _.set(window, path, value);
}

export default {
  get,
  set,
};
