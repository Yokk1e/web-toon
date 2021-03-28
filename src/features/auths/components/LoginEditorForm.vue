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
        v-model="password"
        label="Passowrd"
        outlined
        dense
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
  },
  computed: {
    ...proxyModel("email", "password"),
  },
});
</script>
<style lang="scss" scoped></style>
