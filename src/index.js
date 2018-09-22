import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'

import App from './App.vue'
import { createRouter } from './router'

Vue.config.productionTip = false

Vue.use(AsyncComputed)

let router = createRouter()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')