<template>
  <div>
    <v-col v-if="hasRoleCreatePermission" class="text-right">
      <v-btn color="primary" @click="openCreateRoleDialog">เพิ่ม Role</v-btn>
    </v-col>
    <v-col>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
              <th class="action text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td>{{ role.id }}</td>
              <td>{{ role.name }}</td>
              <td>
                <v-icon color="warning" @click="updateRoleDialog(role)"
                  >mdi-lead-pencil
                </v-icon>
                <v-icon color="error" @click="deleteRoleDialog(role)"
                  >mdi-delete-forever
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <create-role-dialog
        v-model="roleCreateForm"
        :isDialogShow="isCreateDialogShow"
        :validations="this.$v.roleCreateForm"
        :permissions="permissionOptions"
        :isLoading="isLoading"
        @closeCreateDialog="closeCreateDialog"
        @submitCreate="submitCreateRole"
      ></create-role-dialog>
      <update-role-dialog
        v-model="roleUpdateForm"
        :isDialogShow="isUpdateDialogShow"
        :validations="this.$v.roleUpdateForm"
        :permissions="permissionOptions"
        :isLoading="isLoading"
        @closeUpdateDialog="closeUpdateDialog"
        @submitUpdate="submitUpdateRole"
      >
      </update-role-dialog>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required, alpha, minLength } from "vuelidate/lib/validators";
import permission, { PermissionName } from "@/commons/mixins/permission";
import pagination, { PaginationForm } from "@/commons/mixins/pagination";
import { Permission } from "../../permission/models/Permission";
import dialog from "@/commons/mixins/dialog";
import { Role } from "@/features/roles/models/Role";
import { RoleCreateForm } from "../forms/RoleCreateForm";
import { RoleUpdateForm } from "../forms/RoleUpdateForm";
import CreateRoleDialog from "../components/CreateRoleDialog.vue";
import UpdateRoleDialog from "../components/UpdateRoleDialog.vue";

export default Vue.extend({
  mixins: [pagination, permission, dialog],
  components: {
    CreateRoleDialog,
    UpdateRoleDialog,
  },
  validations: {
    roleCreateForm: {
      name: { required, alpha },
      selectedPermissions: {
        required,
        minLength: minLength(1),
      },
    },
    roleUpdateForm: {
      name: { required, alpha },
      selectedPermissions: {
        required,
        minLength: minLength(1),
      },
    },
  },
  data() {
    const roles: Role[] = [];
    const permissions: Permission[] = [];
    const isCreateDialogShow = false;
    const isUpdateDialogShow = false;
    const isLoading = false;
    const roleCreateForm: RoleCreateForm = {
      name: "",
      selectedPermissions: [],
    };
    const roleUpdateForm: RoleUpdateForm = {
      name: "",
      selectedPermissions: [],
    };

    return {
      roles,
      isUpdateDialogShow,
      isCreateDialogShow,
      isLoading,
      roleCreateForm,
      roleUpdateForm,
      permissions,
    };
  },
  computed: {
    permissionOptions() {
      return (this as any).permissions;
    },
    hasRoleCreatePermission() {
      return (this as any).hasPermission(PermissionName.ROLE_CREATE);
    },
  },
  async created() {
    await this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const { items } = await (this as any).$dep.roleUseCase.getRoles({
          perPage: 9999,
        });
        this.roles = items;
      } catch (error) {
        console.log(error);
      }
    },
    async openCreateRoleDialog() {
      this.isLoading = true;
      await this.getPermission();
      this.isCreateDialogShow = true;
      this.isLoading = false;
    },
    async deleteRole(id: number) {
      try {
        await (this as any).$dep.roleUseCase.deleteRole(id);
        (this as any).alertSuccess("Success", "ลบ Role สำเร็จ");
        await this.getRoles();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRoleDialog(role: Role) {
      const isComfirmed = await (this as any).alertConfirm(
        "ลบ Role",
        `คุณต้องการลบ Role name ${role.name} ใช่ไหม?`
      );
      if (isComfirmed) {
        this.deleteRole(role.id);
      }
    },
    async createRole() {
      try {
        await (this as any).$dep.roleUseCase.create(this.roleCreateForm);
        await (this as any).alertSuccess("Success", "สร้าง Role สำเร็จ");
      } catch (error) {
        process.env.NODE_ENV === "production"
          ? (this as any).alertError("Error", "ไม่สามารถสร้าง Role นี้")
          : (this as any).alertError("Error", error);
      }
    },
    async updateRoleDialog(role: Role) {
      this.isLoading = true;
      await this.getPermission();
      await this.getRoleById(role.id);
      this.isLoading = false;
      this.isUpdateDialogShow = true;
    },
    async getRoleById(id: number) {
      try {
        const data = await (this as any).$dep.roleUseCase.getRole(id);

        this.roleUpdateForm = {
          ...data,
          selectedPermissions: data.permissions.map(
            (permission: Permission) => permission.id
          ),
        };
      } catch (error) {
        console.log(error.response);
      }
    },

    async updateRole() {
      try {
        await (this as any).$dep.roleUseCase.updateRole(this.roleUpdateForm);
        await (this as any).alertSuccess("Success", "แก้ไข Role สำเร็จ");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          (this as any).alertError("Error", error.response.data.message);
        } else {
          process.env.NODE_ENV === "production"
            ? (this as any).alertError("Error", "ไม่สามารถแก้ไข Role นี้")
            : (this as any).alertError("Error", error);
        }
      }
    },

    async getPermission() {
      try {
        const {
          items,
        } = await (this as any).$dep.permissionUseCase.getPermissions({
          perPage: 9999,
        });

        this.permissions = items;
      } catch (error) {
        console.log(error.response);
      }
    },

    closeCreateDialog() {
      this.isCreateDialogShow = false;
    },

    closeUpdateDialog() {
      this.isUpdateDialogShow = false;
    },
    async submitCreateRole() {
      this.$v.$touch();
      if (this.$v.roleCreateForm.$invalid) return;
      this.isLoading = true;
      this.closeCreateDialog();
      await this.createRole();
      this.isLoading = false;
      this.roleCreateForm = {
        name: "",
        selectedPermissions: [],
      };
      this.$v.$reset();
      await this.getRoles();
    },

    async submitUpdateRole() {
      this.$v.$touch();
      if (this.$v.roleUpdateForm.$invalid) return;
      this.isLoading = true;
      this.closeUpdateDialog();
      await this.updateRole();
      this.isLoading = false;
      this.roleUpdateForm = {
        name: "",
        selectedPermissions: [],
      };
      this.$v.$reset();
      await this.getRoles();
    },
  },
});
</script>

<style lang="scss" scoped></style>
