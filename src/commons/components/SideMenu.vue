<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item
        v-for="menu in menus"
        :key="menu.title"
        link
        :disabled="isPageActive(menu.path)"
        @click="goToPage(menu.path)"
      >
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";

import { PermissionName } from "../mixins/permission";

export default Vue.extend({
  data() {
    const menuDatas = [
      {
        title: "Users",
        icon: "mdi-account-group",
        path: "UserViewPage",
        permission: PermissionName.USER_VIEW,
      },
      {
        title: "Roles",
        icon: "mdi-account-lock",
        path: "RoleViewPage",
        permission: PermissionName.ROLE_VIEW,
      },
      {
        title: "Contents",
        icon: "mdi-video",
        path: "ContentViewPage",
        permission: PermissionName.CONTENT_VIEW,
      },
    ];

    return { menuDatas, drawer: false };
  },
  computed: {
    menus() {
      return (this as any).menuDatas.filter((menuData: any) =>
        (this as any).hasPermission(menuData.permission)
      );
    },
  },
  methods: {
    goToPage(name: string) {
      this.$router.push({ name });
    },
    isPageActive(name: string) {
      return this.$route.name === name;
    },
  },
});
</script>

<style lang="scss" scoped></style>
