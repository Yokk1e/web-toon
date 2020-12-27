<template>
  <div>
    <v-row>
      <v-text-field
        label="Username"
        outlined
        dense
      ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
        label="Passowrd"
        outlined
        dense
      ></v-text-field>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginForm } from "../forms/LoginForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => LoginForm,
    },
  },
});
</script>
<style lang="scss" scoped></style>
