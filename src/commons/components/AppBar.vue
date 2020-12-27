<template>
  <v-app-bar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Web toon</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="showLoginDialog">mdi-account</v-icon>
    </v-btn>

    <div>
      <dialog-login :dialog="isDialogOpen" @closeDialog="closeDialog">
      </dialog-login>
    </div>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from "vue";
import DialogLogin from "@/features/login/components/DialogLogin.vue";
export default Vue.extend({
  components: {
    DialogLogin,
  },
  data() {
    const isDialogOpen = false;
    return { isDialogOpen };
  },
  methods: {
    showLoginDialog() {
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
});
</script>
<style lang="scss" scoped></style>
