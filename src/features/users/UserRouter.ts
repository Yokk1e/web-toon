import Vue from "vue";
import { RouteConfig } from "vue-router";

import { PermissionName } from "../../commons/mixins/permission";
import UserViewPage from "./pages/UserViewPage.vue";

export const UserRouter: (prefix?: string) => RouteConfig[] = (
  prefix = "user"
) => [
  {
    name: "UserViewPage",
    path: prefix,
    component: UserViewPage,
    meta: { title: "User List" },
    beforeEnter: (to, from, next) => {
      if (
        Vue.prototype.$dep.authUseCase.hasPermission(PermissionName.USER_VIEW)
      ) {
        document.title = to.meta.title;
        next();
        return;
      }
      next({ path: "/" });
    },
  },
];
