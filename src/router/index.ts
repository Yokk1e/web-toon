import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import { AuthRouter } from "@/features/auths/AuthRouter";
import { UserRouter } from "@/features/users/UserRouter";

Vue.use(VueRouter);

const loginGuard = (next: any): boolean => {
  const hasAccessToken = Vue.prototype.$dep.httpClient.hasAccessToken();

  if (!hasAccessToken) {
    next({ name: "AuthLoginPage" });
  }

  return !hasAccessToken;
};

const routes: Array<RouteConfig> = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [...AuthRouter()],
  },
  {
    path: "/",
    component: AppLayout,
    children: [...UserRouter()],
    beforeEnter: (to, from, next) => {
      if (loginGuard(next)) return;
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
