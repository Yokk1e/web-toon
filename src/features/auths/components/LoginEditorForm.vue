<template>
  <div>
    <v-row>
      <v-text-field
        v-model="email"
        label="E-mail"
        outlined
        dense
        :error-messages="emailError"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="password"
        label="Passowrd"
        outlined
        dense
        :error-messages="passwordError"
      ></v-text-field>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { AuthLoginForm } from "../forms/AuthLoginForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => AuthLoginForm,
    },
    validations: {
      type: Object,
    },
  },
  computed: {
    ...proxyModel("email", "password"),
    emailError() {
      return (this as any).validations.email.$error
        ? "Email is required or invalid"
        : "";
    },
    passwordError() {
      return (this as any).validations.password.$error
        ? "Password is required"
        : "";
    },
  },
});
</script>
<style lang="scss" scoped></style>
