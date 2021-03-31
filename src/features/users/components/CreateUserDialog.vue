<template>
  <v-dialog :value="isDialogShow" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Create User</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <create-user-form
            v-model="userCreateForm"
            :validations="validations"
            :roles="roles"
          ></create-user-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialog">
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
import { proxyModel } from "@/commons/utils/proxyModel";
import CreateUserForm from "../components/CreateUserForm.vue";
import { UserCreateForm } from "../forms/UserCreateForm";
import { Role } from "@/features/roles/models/Role";
export default Vue.extend({
  components: {
    CreateUserForm,
  },
  props: {
    value: {
      type: Object as () => UserCreateForm,
    },
    isDialogShow: {
      type: Boolean,
    },
    validations: {
      type: Object,
    },
    roles: {
      type: Array as () => Role[],
    },
    isLoading: {
      type: Boolean,
    },
  },
  computed: {
    userCreateForm: {
      get(): UserCreateForm {
        return (this as any).value;
      },
      set(userCreateForm: UserCreateForm) {
        this.$emit("input", userCreateForm);
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submitCreate() {
      this.$emit("submitCreate");
    },
  },
});
</script>
<style lang="scss" scoped></style>
