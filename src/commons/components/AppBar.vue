<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      @click.stop="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Web toon</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="logout">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    async logout() {
      try {
        await (this as any).$dep.authUseCase.logout();
        this.$router.push({ name: "AuthLoginPage" });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
