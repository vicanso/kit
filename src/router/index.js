import Vue from 'vue';
import Router from 'vue-router';

import App from '@/app';
import globals from '@/helpers/globals';
import {
  HOME,
  LOGIN,
} from '@/constants/url';

const Home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'basic'); // eslint-disable-line
const Login = r => require.ensure([], () => r(require('@/pages/login/login.vue')), 'basic'); // eslint-disable-line

Vue.use(Router);

const routes = [
  {
    path: HOME,
    component: Home,
  },
  {
    path: LOGIN,
    component: Login,
  },
];

export default new Router({
  strict: globals.get('CONFIG.env') !== 'production',
  routes: [
    {
      path: '/',
      component: App,
      children: routes,
    },
  ],
});
