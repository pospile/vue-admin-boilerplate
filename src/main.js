import Vue from 'vue'
//import Vuex from 'vuex';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as store from "store2";
Object.defineProperty(Vue.prototype, '$store', { value: store });

Vue.config.productionTip = false;
//Vue.use(Vuex);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
