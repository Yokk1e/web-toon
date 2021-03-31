<template>
  <div>
    <v-col v-if="hasUserCreatePermission" class="text-right">
      <v-btn color="primary" @click="openCreateUserDialog">เพิ่ม User</v-btn>
    </v-col>
    <v-col>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Email</th>
              <th class="text-left">User</th>
              <th class="action text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.userName }}</td>
              <td>
                <v-icon color="error" @click="deleteUserDialog(user)"
                  >mdi-delete-forever
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <create-user-dialog
        v-model="userCreateForm"
        :isDialogShow="isDialogShow"
        :validations="this.$v.userCreateForm"
        :roles="roles"
        :isLoading="isLoading"
        @closeDialog="closeDialog"
        @submitCreate="submitCreateUser"
      ></create-user-dialog>
      <pagination
        v-model="currentPage"
        :numberOfItemPerPage="perPage"
        :numberOfItems="totalRows"
      >
      </pagination>
    </v-col>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import permission, { PermissionName } from "@/commons/mixins/permission";
import pagination, { PaginationForm } from "@/commons/mixins/pagination";
import { UserCreateForm } from "../forms/UserCreateForm";
import dialog from "@/commons/mixins/dialog";
import { User } from "../models/User";
import { Role } from "@/features/roles/models/Role";
import CreateUserDialog from "../components/CreateUserDialog.vue";

export default Vue.extend({
  mixins: [pagination, permission, dialog],
  components: {
    CreateUserDialog,
  },
  validations: {
    userCreateForm: {
      email: { required, email },
      userName: { required },
      password: { required, minLength: minLength(6) },
      confirmPassword: {
        sameAsPassword: sameAs("password"),
      },
      role: {
        required,
      },
    },
  },
  data() {
    const users: User[] = [];
    const roles: Role[] = [];
    const userCreateForm: UserCreateForm = {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      role: 0,
    };
    const isDialogShow = false;
    const isLoading = false;

    return { users, userCreateForm, isDialogShow, roles, isLoading };
  },
  computed: {
    hasUserCreatePermission() {
      return (this as any).hasPermission(PermissionName.USER_CREATE);
    },
  },
  async created() {
    (this as any).getPaginationRouteQuery();

    await Promise.all([this.getUsers()]);
  },
  watch: {
    async "$route.query"() {
      await this.getUsers();
    },
  },
  methods: {
    async getUsers() {
      const form: PaginationForm = {
        page: (this as any).currentPage,
        perPage: (this as any).perPage,
      };
      try {
        const { items, meta } = await (this as any).$dep.userUseCase.getUsers(
          form
        );

        this.users = items;
        (this as any).setPaginationMeta(meta);
      } catch (error) {
        console.log(error.response);
      }
    },
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
    async deleteUser(id: number) {
      try {
        await (this as any).$dep.userUseCase.deleteUser(id);
        (this as any).alertSuccess("Success", "ลบ User สำเร็จ");
        this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },
    async openCreateUserDialog() {
      await this.getRoles();
      this.isDialogShow = true;
    },
    async deleteUserDialog(user: User) {
      const isComfirmed = await (this as any).alertConfirm(
        "ลบ User",
        `คุณต้องการลบ User Email ${user.email} ใช่ไหม?`
      );
      if (isComfirmed) {
        this.deleteUser(user.id);
      }
    },
    async createUser() {
      try {
        await (this as any).$dep.userUseCase.create(this.userCreateForm);
      } catch (error) {
        console.log(error);
      }
    },
    closeDialog() {
      this.isDialogShow = false;
      this.isLoading = false;
      this.userCreateForm = {
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        role: 0,
      };
    },
    async submitCreateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.isLoading = true;
      await this.createUser();
      this.isLoading = false;
      this.isDialogShow = false;
      await this.getUsers();
    },
  },
});
</script>

<style lang="scss" scoped>
.action {
  width: 20%;
}
</style>
