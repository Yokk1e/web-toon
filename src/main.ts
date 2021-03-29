import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from 'vuelidate'
import * as components from "@/commons/components";
import * as mixins from "@/commons/mixins";
import VueSweetalert2 from "vue-sweetalert2";
import { DependencyPlugin } from "./dependencies";

Object.keys(components).forEach((key) => {
  Vue.component(key, (components as any)[key]);
});

Object.entries(mixins).forEach(([, mixin]) => {
  Vue.mixin(mixin);
});

Vue.config.productionTip = false;

Vue.use(DependencyPlugin);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate)

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
