import Vue from "vue";
import { RouteConfig } from "vue-router";

import AuthLoginPage from "../auths/pages/AuthLoginPage.vue";

export const AuthRouter: (prefix?: string) => RouteConfig[] = (prefix = "") => [
  {
    name: "AuthLoginPage",
    path: "login",
    component: AuthLoginPage,
  },
];
