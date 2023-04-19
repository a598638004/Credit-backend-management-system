import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import './assets/normalize.css';
Vue.use(plugins)

import directives from './directives'
Vue.use(directives)

// 安装常用功能
import common from '@/common';
Vue.use(common);

import filters from '@/filters';
Vue.use(filters);

import Axios from 'axios';


// 和代理做标识的对应, baseUrl
Axios.defaults.baseURL = '/api'
Vue.prototype.$ajax = Axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
