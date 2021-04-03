import Vue from "vue";
import { RouteConfig } from "vue-router";

import { PermissionName } from "../../commons/mixins/permission";
import RoleViewPage from "./pages/RoleViewPage.vue";

export const RoleRouter: (prefix?: string) => RouteConfig[] = (
  prefix = "role"
) => [
  {
    name: "RoleViewPage",
    path: prefix,
    component: RoleViewPage,
    meta: { title: "Role List" },
    beforeEnter: (to, from, next) => {
      if (
        Vue.prototype.$dep.authUseCase.hasPermission(PermissionName.ROLE_VIEW)
      ) {
        document.title = to.meta.title;
        next();
        return;
      }
      next({ path: "/" });
    },
  },
];
