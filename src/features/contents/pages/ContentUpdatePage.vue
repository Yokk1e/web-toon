<template>
  <div class="main-content">
    <div class="header-content mb-4">
      <h1>Update Content</h1>
      <v-btn color="success" :loading="loading" @click="submitContent"
        >Save</v-btn
      >
    </div>
    <content-editor-form
      v-model="contentUpdateForm"
      state="UPDATE"
      :imageUrl="imageUrl"
      :validations="this.$v.contentUpdateForm"
    >
    </content-editor-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { required, not } from "vuelidate/lib/validators";
import ContentEditorForm from "../components/ContentEditorForm.vue";
import dialog from "@/commons/mixins/dialog";
import { ContentUpdateForm } from "../forms/ContentUpdateForm";
export default Vue.extend({
  mixins: [dialog],
  components: { ContentEditorForm },
  validations: {
    contentUpdateForm: {
      name: { required },
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
    const imageUrl = "";
    const contentUpdateForm: ContentUpdateForm = {
      name: "",
      file: "",
      description: "",
      episodes: [],
    };
    return { contentUpdateForm, loading, imageUrl };
  },
  async created() {
    await this.getContent(+this.$route.params.id);
  },
  methods: {
    async getContent(id: number) {
      try {
        const {
          imageFilename,
          ...data
        } = await (this as any).$dep.contentUseCase.getContent(id);
        this.imageUrl = await (this as any).$dep.contentUseCase.getImagePath(
          imageFilename
        );
        this.contentUpdateForm = data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitContent() {
      this.$v.$touch();
      if (this.$v.contentUpdateForm.$invalid) return;

      await this.updateContent();
      this.goToContentViewPage();
    },
    async updateContent() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("name", this.contentUpdateForm.name);
        formData.append("description", this.contentUpdateForm.description);
        formData.append(
          "episodes",
          JSON.stringify(this.contentUpdateForm.episodes)
        );
        formData.append("image", this.contentUpdateForm.file);

        await (this as any).$dep.contentUseCase.updateContent(
          this.contentUpdateForm.id,
          formData
        );
        await (this as any).alertSuccess("Success", "แก้ไข Content สำเร็จ");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          (this as any).alertError("Error", error.response.data.message);
        } else {
          process.env.NODE_ENV === "production"
            ? (this as any).alertError("Error", "ไม่สามารถ Update Content นี้")
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
