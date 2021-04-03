<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          dense
          :error-messages="nameError"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { RoleCreateForm } from "../forms/RoleCreateForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => RoleCreateForm,
    },
    validations: {
      type: Object,
    }
  },
  computed: {
    ...proxyModel("name"),
    nameError() {
      return (this as any).validations.name.$error
        ? "Role is required or invalid."
        : "";
    },
  },
});
</script>
<style lang="scss" scoped></style>
