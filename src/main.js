import TouTiao from '@/components/TouTiaoIcon.vue';
import '@/styles/index.less';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.component('TouTiao', TouTiao);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
