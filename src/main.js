import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant from 'vant'
// 引入vant的全局样式库
import 'vant/lib/index.css'
import './styles/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
