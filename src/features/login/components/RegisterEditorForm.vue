<template>
  <div>
    <v-row>
      <v-text-field
        v-model="email"
        label="E-mail"
        outlined
        dense
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="userName"
        label="Username"
        outlined
        dense
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="password"
        label="Password"
        outlined
        dense
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        v-model="confirmPassword"
        label="Confirm password"
        outlined
        dense
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field v-model="age" label="Age" outlined dense></v-text-field>
    </v-row>
    <v-radio-group v-model="gender" row>
      <v-radio label="Men" value="1"></v-radio>
      <v-radio label="Women" value="2"></v-radio>
    </v-radio-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { RegisterForm } from "../forms/RegisterForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => RegisterForm,
    },
  },
  computed: {
    ...proxyModel(
      "email",
      "userName",
      "password",
      "confirmPassword",
      "gender",
      "age"
    ),
  },
});
</script>
<style lang="scss" scoped></style>
