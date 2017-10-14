import Vue from 'vue';
import Router from 'vue-router';
import globals from '@/helpers/globals';
import routes from './routes';
import applyRouterMiddlewares from './apply-middlewares';

const target = globals.get('CONFIG.target');
Vue.use(Router);
const router = new Router({
  mode: target === 'app' ? 'hash' : 'history',
  routes,
});
applyRouterMiddlewares(router);
export default router;
