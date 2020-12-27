<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ diaLogHeader }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div v-if="isLoginForm">
              <login-editor-form v-model="loginForm"></login-editor-form>
              <v-btn class="mb-3" block color="success">
                Login
              </v-btn>

              <v-btn outlined block @click="closeDialog">
                Close
              </v-btn>
            </div>
            <div v-else>
              <register-editor-form></register-editor-form>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginForm } from "../forms/LoginForm";
import LoginEditorForm from "./LoginEditorForm.vue";
import RegisterEditorForm from "./RegisterEditorForm.vue";
export default Vue.extend({
  props: {
    dialog: {
      type: Boolean,
    },
  },
  components: {
    LoginEditorForm,
    RegisterEditorForm,
  },
  data() {
    const diaLogHeader = "Login";
    const isLoginForm = true;
    const loginForm: LoginForm = {};

    return { diaLogHeader, isLoginForm, loginForm };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    test() {
      console.log("tes");
    },
  },
});
</script>
<style lang="scss" scoped></style>
