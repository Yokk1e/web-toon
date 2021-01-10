<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="email"
          label="E-mail"
          outlined
          dense
          :error-messages="emailError"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="userName"
          label="Username"
          outlined
          dense
          :error-messages="usernameError"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="password"
          label="Password"
          outlined
          dense
          :error-messages="passwordError"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="confirmPassword"
          label="Confirm password"
          outlined
          dense
          :error-messages="confirmPasswordError"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { RegisterForm } from "../../users/forms/RegisterForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => RegisterForm,
    },
    validations: {
      type: Object,
    },
  },
  computed: {
    ...proxyModel(
      "email",
      "userName",
      "password",
      "confirmPassword",
    ),
    emailError() {
      return (this as any).validations.email.$error ? "Email is invalid" : "";
    },
    usernameError() {
      return (this as any).validations.userName.$error
        ? "Username is empty or invalid"
        : "";
    },
    passwordError() {
      return (this as any).validations.password.$error
        ? "Passwords is empty or invlid"
        : "";
    },
    confirmPasswordError() {
      return (this as any).validations.confirmPassword.$error
        ? "Passwords must be identical."
        : "";
    },
  },
});
</script>
<style lang="scss" scoped></style>
