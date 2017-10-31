// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'es6-promise/auto';

import Vue from 'vue';
import _ from 'lodash';
import VuexRouterSync from 'vuex-router-sync';
import {
  Loading,
  Message,
  Form,
  FormItem,
  Input,
  Radio,
  Button,
  Alert,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icons/iconfont.css';

import App from '@/views/app';
import router from '@/router';
import store from '@/store';

import * as statsService from '@/services/stats';
import '@/directives/index';
import '@/filters/index';
import globals from '@/helpers/globals';

const env = globals.get('CONFIG.env');

Vue.config.productionTip = env === 'production';

Vue.config.errorHandler = (err, vm, info) => {
  if (env === 'development') {
    // eslint-disable-next-line
    console.error(info);
    throw err;
  } else {
    // TODO add error log to backend
    console.error(err);
  }
};

VuexRouterSync.sync(store, router);

// 注入 router 和 store
Vue.$router = router;
Vue.$store = store;
// 注入全局都需要使用的ui组件
Vue.use(Loading)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Radio)
  .use(Button)
  .use(Alert)
  .use(Tabs)
  .use(TabPane)
  .use(Table)
  .use(TableColumn)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem);

Vue.prototype.$message = Message;
Vue.prototype.$alert = (err) => {
  Message({
    showClose: true,
    message: err.message,
    type: 'error',
  });
  if (env !== 'production') {
    throw err;
  }
};
// 全局的加载loading
Vue.prototype.$lockLoading = function lockLoading(delay = 30) {
  let loading = null;
  const timer = setTimeout(() => {
    loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }, delay);
  return () => {
    clearTimeout(timer);
    if (loading) {
      loading.close();
    }
  };
};

Vue.prototype.$next = function next() {
  return new Promise(resolve => this.$nextTick(resolve));
};

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

_.defer(() => {
  statsService.startWatchStats();
  statsService.page();
});
