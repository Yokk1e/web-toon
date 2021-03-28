<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ diaLogHeader }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div v-if="isLoginForm">
              <login-editor-form v-model="loginForm"></login-editor-form>
              <div>
                <v-row>
                  <v-col class="text-right">
                    <a href="#" @click="goToRegisterForm">register</a>
                  </v-col>
                </v-row>
              </div>
              <v-row>
                <v-col>
                  <v-btn block outlined @click="closeDialog">
                    Close
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block color="success" @click="login">
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <register-editor-form
                v-model="registerForm"
                :validations="this.$v.registerForm"
              ></register-editor-form>
              <v-btn class="mb-3" block color="success" @click="submitRegister">
                Register
              </v-btn>
              <v-btn block outlined @click="closeDialog">
                Close
              </v-btn>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import {
  required,
  minLength,
  email,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";

import { LoginForm } from "../forms/LoginForm";
import { RegisterForm } from "../../users/forms/RegisterForm";
import LoginEditorForm from "./LoginEditorForm.vue";
import RegisterEditorForm from "../../users/components/RegisterEditorForm.vue";
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
  validations: {
    registerForm: {
      email: { required, email },
      userName: { required },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPassword: {
        sameAsPassword: sameAs("password"),
      },
    },
  },
  data() {
    const diaLogHeader = "Login";
    const isLoginForm = true;
    const loginForm: LoginForm = {
      email: "",
      password: "",
    };
    const registerForm: RegisterForm = {};

    return { diaLogHeader, isLoginForm, loginForm, registerForm };
  },
  methods: {
    closeDialog() {
      this.diaLogHeader = "Login";
      this.isLoginForm = true;
      this.$emit("closeDialog");
    },
    goToRegisterForm() {
      this.diaLogHeader = "Register";
      this.isLoginForm = false;
    },
    async submitRegister() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      await this.register();
    },
    async register() {
      try {
        await (this as any).$dep.userUseCase.register(this.registerForm);
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      try {
        await (this as any).$dep.loginUseCase.login(this.loginForm);           
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
