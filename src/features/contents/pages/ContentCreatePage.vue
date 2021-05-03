<template>
  <div class="main-content">
    <div class="header-content mb-4">
      <h1>Create Content</h1>
      <v-btn color="success" :loading="loading" @click="submitContent">
        Save
      </v-btn>
    </div>
    <content-editor-form
      v-model="contentCreateForm"
      :validations="this.$v.contentCreateForm"
    >
    </content-editor-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import ContentEditorForm from "../components/ContentEditorForm.vue";
import dialog from "@/commons/mixins/dialog";
import { ContentCreateForm } from "../forms/ContentCreateForm";
export default Vue.extend({
  mixins: [dialog],
  components: { ContentEditorForm },
  validations: {
    contentCreateForm: {
      name: { required },
      file: { required },
      description: { required },
      episodes: {
        $each: {
          title: { required },
        },
      },
    },
  },
  data() {
    const loading = false;
    const contentCreateForm: ContentCreateForm = {
      name: "",
      file: "",
      description: "",
      episodes: [],
    };
    return { contentCreateForm, loading };
  },
  methods: {
    async submitContent() {
      this.$v.$touch();
      if (this.$v.contentCreateForm.$invalid) return;

      await this.createContent();
      this.goToContentViewPage();
    },
    async createContent() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("name", this.contentCreateForm.name);
        formData.append("description", this.contentCreateForm.description);
        formData.append(
          "episodes",
          JSON.stringify(this.contentCreateForm.episodes)
        );
        formData.append("image", this.contentCreateForm.file);

        await (this as any).$dep.contentUseCase.createContent(formData);
        await (this as any).alertSuccess("Success", "สร้่าง Content สำเร็จ");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          (this as any).alertError("Error", error.response.data.message);
        } else {
          process.env.NODE_ENV === "production"
            ? (this as any).alertError("Error", "ไม่สามารถสร้าง Content นี้")
            : (this as any).alertError("Error", error);
        }
      } finally {
        this.loading = false;
      }
    },
    goToContentViewPage() {
      this.$router.push({ name: "ContentViewPage" });
    },
  },
});
</script>
<style lang="scss" scoped>
.main-content {
  padding: 2em 5em 5em 5em;
}
.header-content {
  display: flex;
  justify-content: space-between;
}
</style>
