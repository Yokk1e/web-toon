<template>
  <v-app>
    <side-menu ref="drawer"></side-menu>
    <app-bar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"></app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss" scoped></style>
