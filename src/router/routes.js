import paths from '@/router/paths';

const view = name => (resolve) => {
    require([`@/views/${name}/index.vue`], resolve); // eslint-disable-line
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
];
