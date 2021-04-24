<template>
  <v-dialog :value="isDialogShow" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Create Role</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <editor-role-form
            v-model="roleCreateForm"
            :validations="validations"
            :permissions="permissions"
          ></editor-role-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeCreateDialog">
          Close
        </v-btn>
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="submitCreate"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import EditorRoleForm from "./EditorRoleForm.vue";
import { RoleCreateForm } from "../forms/RoleCreateForm";
export default Vue.extend({
  components: {
    EditorRoleForm,
  },
  props: {
    value: {
      type: Object as () => RoleCreateForm,
    },
    isDialogShow: {
      type: Boolean,
    },
    validations: {
      type: Object,
    },
    permissions: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
    },
  },
  computed: {
    roleCreateForm: {
      get(): RoleCreateForm {
        return (this as any).value;
      },
      set(roleCreateForm: RoleCreateForm) {
        this.$emit("input", roleCreateForm);
      },
    },
  },
  methods: {
    closeCreateDialog() {
      this.$emit("closeCreateDialog");
    },
    submitCreate() {
      this.$emit("submitCreate");
    },
  },
});
</script>
<style lang="scss" scoped></style>
