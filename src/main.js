import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//vant轻
import {
  Button,
  Toast
} from 'vant'

Vue.use(Button).use(Toast)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')