import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 01 引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 1 引入 axios
import axios from 'axios';

// 2 设置后台访问路径
axios.defaults.baseURL = 'http://localhost:8086'

Vue.config.productionTip = false

// 02 使用 ElementUI
Vue.use(ElementUI);

// 3 挂载axios
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
