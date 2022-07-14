import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import TouTiao from "@/components/TouTiaoIcon.vue";
import "@/styles/index.less";
import "amfe-flexible";
import store from "./store";
import "vant/lib/index.less";

import "@/utils/dayjs";
// vant注册
import vant from "vant";

// import request from "@/utils/request";
//
// request.get("/v1_0/channels").then((res) => {
//   console.log(res.data.data.channels);
// });

Vue.use(vant);
Vue.component("TouTiao", TouTiao);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
