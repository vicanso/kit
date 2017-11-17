import paths from '@/router/paths';

const view = name => (resolve) => {
  // eslint-disable-next-line
  require([`@/views/${name}/index.vue`], resolve);
};


const create = name => ({
  name,
  path: paths(name),
  component: view(name),
});

export default [
  create('home'),
  create('login'),
  create('register'),
  create('i18n'),
  create('mock'),
  create('user'),
];
