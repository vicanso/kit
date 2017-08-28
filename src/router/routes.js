import paths from './paths';

const view = name => (resolve) => {
    require([`@/views/${name}/index.vue`], resolve); // eslint-disable-line
};

const path = name => paths[name];

export default [
  {
    name: 'home',
    path: path('home'),
    component: view('home'),
  },
  {
    name: 'login',
    path: path('login'),
    component: view('login'),
  },
  {
    name: 'register',
    path: path('register'),
    component: view('register'),
  },
];
