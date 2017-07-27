// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import router from '@/router';
import globals from '@/helpers/globals';
import _ from '@/helpers/_';
import store from '@/store';
import * as statsService from '@/services/stats';

Vue.use(ElementUI);

Vue.config.productionTip = false;

function statistics() {
  const data = {
    screen: _.pick(globals.get('screen'), 'width height availWidth availHeight'.split(
      ' ')),
  };
  const timing = globals.get('TIMING');
  timing.end('js');
  timing.end('page');
  data.timing = timing.toJSON();
  statsService.statistics(data)
    .then(() => console.info('post statistics success'))
    .catch(err => console.error('post statistics fail, %s', err));
}

_.defer(() => {
  statistics();
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
  });
});

