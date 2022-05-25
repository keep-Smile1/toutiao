import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
// 引入vant
import 'vant/lib/index.css'
// 移动端 REM 适配
import 'amfe-flexible'

import './style/index.less'

Vue.config.productionTip = false

// 注册组件
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
