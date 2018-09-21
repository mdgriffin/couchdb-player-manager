import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

Vue.config.productionTip = false

let router = createRouter()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')