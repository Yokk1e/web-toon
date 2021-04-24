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

    <label>Permission ทั้งหมด</label>
    <v-checkbox
      v-for="(permission, index) in permissions"
      :key="'permission_' + index"
      v-model="selectedPermissions"
      :label="permission.name"
      :value="permission.id"
    ></v-checkbox>
    <p v-show="validations.$error" class="error-text">
      {{ permissionError }}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { RoleEditForm } from "../forms/RoleEditForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => RoleEditForm,
    },
    validations: {
      type: Object,
    },
    permissions: {
      type: Array,
    },
  },
  computed: {
    ...proxyModel("name", "selectedPermissions"),
    nameError() {
      return (this as any).validations.name.$error
        ? "Role is required or invalid."
        : "";
    },
    permissionError() {
      return (this as any).validations.selectedPermissions.$error
        ? "Permission is required or invalid"
        : "";
    },
  },
});
</script>
<style lang="scss" scoped></style>
