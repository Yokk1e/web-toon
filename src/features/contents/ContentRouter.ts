import Vue from "vue";
import { RouteConfig } from "vue-router";

import { PermissionName } from "../../commons/mixins/permission";
import ContentViewPage from "./pages/ContentViewPage.vue";

export const ContentRouter: (prefix?: string) => RouteConfig[] = (
  prefix = "content"
) => [
  {
    name: "ContentViewPage",
    path: prefix,
    component: ContentViewPage,
    meta: { title: "Content List" },
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
