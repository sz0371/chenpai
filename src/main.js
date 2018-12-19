// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import 'babel-polyfill'
import { Pagination, Row, Col } from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import './assets/css/base.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://119.23.56.10:9094/web-chengpai/'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.axios = axios
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
window.router = router
window.path = 'http://119.23.56.10:9094'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
