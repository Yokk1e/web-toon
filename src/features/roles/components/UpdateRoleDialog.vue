<template>
  <v-dialog :value="isDialogShow" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Update Role</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <editor-role-form
            v-model="roleUpdateForm"
            :validations="validations"
            :permissions="permissions"
          ></editor-role-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeUpdateDialog">
          Close
        </v-btn>
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="submitUpdate"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import EditorRoleForm from "./EditorRoleForm.vue";
import { RoleUpdateForm } from "../forms/RoleUpdateForm";
export default Vue.extend({
  components: {
    EditorRoleForm,
  },
  props: {
    value: {
      type: Object as () => RoleUpdateForm,
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
    roleUpdateForm: {
      get(): RoleUpdateForm {
        return (this as any).value;
      },
      set(roleUpdateForm: RoleUpdateForm) {
        this.$emit("input", roleUpdateForm);
      },
    },
  },
  methods: {
    closeUpdateDialog() {
      this.$emit("closeUpdateDialog");
    },
    submitUpdate() {
      this.$emit("submitUpdate");
    },
  },
});
</script>
<style lang="scss" scoped></style>
