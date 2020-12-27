import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as components from "@/commons/components";

Object.keys(components).forEach((key) => {
  Vue.component(key, (components as any)[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
