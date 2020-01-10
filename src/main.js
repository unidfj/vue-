import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
//vant
import {
  Button,
  Toast,
  Uploader,
  Dialog,
  Field,
  Picker,
  Icon,
  Tab,
  Tabs,
  List,
  PullRefresh,
  SwipeCell
} from "vant";

Vue.use(Button).use(SwipeCell).use(Toast).use(Uploader).use(Dialog).use(Field).use(Picker).use(Icon).use(Tab).use(Tabs).use(List).use(PullRefresh);

import "@/styles/reset.css";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");