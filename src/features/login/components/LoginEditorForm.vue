<template>
  <div>
    <v-row>
      <v-text-field
        v-model="email"
        label="Username"
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
import { LoginForm } from "../forms/LoginForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => LoginForm,
    },
  },
  computed: {
    ...proxyModel("email", "password"),
  },
});
</script>
<style lang="scss" scoped></style>
