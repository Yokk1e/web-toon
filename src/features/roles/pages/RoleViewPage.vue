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
        :isDialogShow="isDialogShow"
        :validations="this.$v.roleCreateForm"
        :roles="roles"
        :isLoading="isLoading"
        @closeDialog="closeDialog"
        @submitCreate="submitCreateRole"
      ></create-role-dialog>
		</v-col>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { required, alpha } from "vuelidate/lib/validators";
import permission, { PermissionName } from "@/commons/mixins/permission";
import pagination, { PaginationForm } from "@/commons/mixins/pagination";
import dialog from "@/commons/mixins/dialog";
import { Role } from "@/features/roles/models/Role";
import { RoleCreateForm } from "../forms/RoleCreateForm";
import CreateRoleDialog from "../components/CreateRoleDialog.vue";

export default Vue.extend({
	mixins: [pagination, permission, dialog],
	components: {
    CreateRoleDialog,
  },
	validations: {
    roleCreateForm: {
      name: { required, alpha }
    },
  },
	data() {
		const roles: Role[] = [];

		const isDialogShow = false;
    const isLoading = false;

		const roleCreateForm: RoleCreateForm = {
			name: ""
    };

		return { roles, isDialogShow, isLoading, roleCreateForm }
	},
	computed: {
    hasRoleCreatePermission() {
      return (this as any).hasPermission(PermissionName.ROLE_CREATE);
    },
  },
	async created() {
		await this.getRoles();
		console.log(this.roles);
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
      this.isDialogShow = true;
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
      } catch (error) {
        console.log(error);
      }
    },
		closeDialog() {
      this.isDialogShow = false;
      this.isLoading = false;
      this.roleCreateForm = {
        name: ""
      };
			this.$v.$reset();
    },
    async submitCreateRole() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.isLoading = true;
      await this.createRole();
			this.closeDialog();
      await this.getRoles();
    }
	}
})
</script>

<style lang="scss" scoped>

</style>