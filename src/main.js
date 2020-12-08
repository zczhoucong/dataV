import Vue from 'vue';
import store from './vuex/store';
import App from './App.vue';
import router from './router'; //路由挂载
import VueClipboard from 'vue-clipboard2'
import iView from 'iview';
import '../static/mytheme/iview.css'

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import comView from './com/list'; // 组件库挂载

// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import mapapi from 'utils/zymap'
Vue.prototype.$mapapi = mapapi

Vue.use(iView);
Vue.use(VueClipboard)

Vue.use(comView);
window.$Vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});