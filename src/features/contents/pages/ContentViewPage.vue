<template>
  <div>
    <v-col v-if="hasContentCreatePermission" class="text-right">
      <v-btn color="primary" @click="gotoContentCreatePage"
        >เพิ่ม Content</v-btn
      >
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
            <tr v-for="content in contents" :key="content.id">
              <td>{{ content.id }}</td>
              <td>{{ content.name }}</td>
              <td>
                <v-icon color="warning" @click="gotoUpdatePage(content)"
                  >mdi-lead-pencil
                </v-icon>
                <v-icon color="error" @click="deleteContentDialog(content)"
                  >mdi-delete-forever
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Content } from "../models/Content";
import permission, { PermissionName } from "@/commons/mixins/permission";
import pagination, { PaginationForm } from "@/commons/mixins/pagination";
import dialog from "@/commons/mixins/dialog";
export default Vue.extend({
  mixins: [pagination, permission, dialog],
  data() {
    const contents: Content[] = [];
    return { contents };
  },
  computed: {
    hasContentCreatePermission() {
      return (this as any).hasPermission(PermissionName.CONTENT_CREATE);
    },
  },
  async created() {
    await this.getContents();
  },
  methods: {
    async getContents() {
      try {
        const { items } = await (this as any).$dep.contentUseCase.getContents({
          perPage: 10,
        });
        this.contents = items;
      } catch (e) {
        console.log(e);
      }
    },
    gotoUpdatePage(content: Content) {
      this.$router.push({
        name: "ContentUpdatePage",
        params: { id: content.id.toString() },
      });
    },
    gotoContentCreatePage() {
      this.$router.push({
        name: "ContentCreatePage",
      });
    },
    async deleteContentDialog(content: Content) {
      const isComfirmed = await (this as any).alertConfirm(
        "ลบ Content",
        `คุณต้องการลบ Content ${content.name} ใช่ไหม?`
      );
      if (isComfirmed) {
        this.deleteContent(content.id);
      }
    },
    async deleteContent(id: number) {
      try {
        await (this as any).$dep.contentUseCase.deleteContent(id);
        (this as any).alertSuccess("Success", "ลบ Content สำเร็จ");
        this.getContents();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
