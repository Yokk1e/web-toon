import Vue from "vue";
import { RouteConfig } from "vue-router";

import { PermissionName } from "../../commons/mixins/permission";
import ContentViewPage from "./pages/ContentViewPage.vue";
import ContentUpdatePage from "./pages/ContentUpdatePage.vue";
import ContentCreatePage from "./pages/ContentCreatePage.vue";

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
  {
    name: "ContentCreatePage",
    path: `${prefix}/create`,
    component: ContentCreatePage,
    meta: { title: "Content Create" },
    beforeEnter: (to, from, next) => {
      if (
        Vue.prototype.$dep.authUseCase.hasPermission(
          PermissionName.CONTENT_CREATE
        )
      ) {
        document.title = to.meta.title;
        next();
        return;
      }
      next({ path: "/" });
    },
  },
  {
    name: "ContentUpdatePage",
    path: `${prefix}/edit/:id`,
    component: ContentUpdatePage,
    meta: { title: "Content Update" },
    beforeEnter: (to, from, next) => {
      if (
        Vue.prototype.$dep.authUseCase.hasPermission(
          PermissionName.CONTENT_EDIT
        )
      ) {
        document.title = to.meta.title;
        next();
        return;
      }
      next({ path: "/" });
    },
  },
];
