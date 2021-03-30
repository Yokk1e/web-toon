<template>
  <div>
    <v-col v-if="hasUserCreatePermission" class="text-right">
      <v-btn color="primary">เพิ่ม User</v-btn>
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
                <v-btn
                  class="mx-2"
                  color="error"
                  fab
                  x-small
                  dark
                  @click="deleteUserDialog(user)"
                >
                  <v-icon>mdi-delete-forever </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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

import permission, { PermissionName } from "@/commons/mixins/permission";
import pagination, { PaginationForm } from "@/commons/mixins/pagination";
import dialog from "@/commons/mixins/dialog";
import { User } from "../models/User";

export default Vue.extend({
  mixins: [pagination, permission, dialog],
  data() {
    const users: User[] = [];
    const deleteId = 0;
    return { users, deleteId };
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
        const { data, meta } = await (this as any).$dep.userUseCase.getUsers(
          form
        );

        this.users = data;
        (this as any).setPaginationMeta(meta);
      } catch (error) {
        console.log(error.response);
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
    async deleteUserDialog(user: User) {
      const isComfirmed = await (this as any).alertConfirm(
        "ลบ User",
        `คุณต้องการลบ User Email ${user.email} ใช่ไหม?`
      );
      if (isComfirmed) {
        this.deleteUser(user.id);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.action {
  width: 20%;
}
</style>
