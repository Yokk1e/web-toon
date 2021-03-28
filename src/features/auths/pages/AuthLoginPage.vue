<template>
  <div class="pt-12 d-flex justify-center">
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <login-editor-form
            v-model="authLoginForm"
            :validations="this.$v.authLoginForm"
          ></login-editor-form>
          <v-btn
            block
            color="success"
            :loading="isLoading"
            :disabled="isLoading"
            @click="login"
          >
            Login
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { required, email } from "vuelidate/lib/validators";

import { AuthLoginForm } from "../forms/AuthLoginForm";
import LoginEditorForm from "../components/LoginEditorForm.vue";
export default Vue.extend({
  components: {
    LoginEditorForm,
  },
  validations: {
    authLoginForm: {
      email: { required, email },
      password: { required },
    },
  },
  data() {
    const isLoading = false;
    const authLoginForm: AuthLoginForm = {
      email: "",
      password: "",
    };

    return { isLoading, authLoginForm };
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.isLoading = true;
      try {
        await (this as any).$dep.authUseCase.login(this.authLoginForm);
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
