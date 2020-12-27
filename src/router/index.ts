import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: AppLayout,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
