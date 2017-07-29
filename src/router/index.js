import Vue from 'vue';
import Router from 'vue-router';

import App from '@/app';
import globals from '@/helpers/globals';
import {
  HOME,
  LOGIN,
  REGISTER,
} from '@/constants/url';

const Home = r => require.ensure([], () => r(require('@/pages/home/home.vue')), 'basic'); // eslint-disable-line
const Login = r => require.ensure([], () => r(require('@/pages/login/login.vue')), 'basic'); // eslint-disable-line
const Register = r => require.ensure([], () => r(require('@/pages/register/register.vue')), 'basic'); // eslint-disable-line

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
  {
    path: REGISTER,
    component: Register,
  },
];

const router = new Router({
  strict: globals.get('CONFIG.env') !== 'production',
  routes: [
    {
      path: '/',
      component: App,
      children: routes,
    },
  ],
});

let stats = null;
router.beforeEach((to, from, next) => {
  stats = {
    to: to.path,
    from: from.path,
    startedAt: Date.now(),
  };
  /* eslint no-param-reassign:0 */
  return next();
});

router.afterEach(() => {
  // TODO add router stats to backend
  const use = Date.now() - stats.startedAt;
  console.dir({
    use,
    ...stats,
  });
});

export default router;
