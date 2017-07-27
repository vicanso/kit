import Vue from 'vue';
import Router from 'vue-router';

import App from '@/app';
import globals from '@/helpers/globals';
import {
  HOME,
} from '@/constants/url';
import Home from '@/pages/home';

Vue.use(Router);

const routes = [
  {
    path: HOME,
    component: Home,
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
