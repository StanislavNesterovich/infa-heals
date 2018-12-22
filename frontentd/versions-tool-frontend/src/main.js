import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import './components';
import './mixins';
import './styles/main.scss';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
