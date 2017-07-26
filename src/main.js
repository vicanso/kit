// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import defer from 'lodash/defer';
import App from './App';
import router from './router';

Vue.config.productionTip = false;


defer(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
  });
  console.dir(window.TIMING);
});

