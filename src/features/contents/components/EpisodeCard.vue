<template>
  <v-card class="mb-4" @click="updateDialog">
    <div class="content">
      <label>{{ value.title }}</label>
      <v-icon color="error" @click.stop="deleteDialog">
        mdi-delete-forever
      </v-icon>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import dialog from "@/commons/mixins/dialog";
import { EpisodeEditorForm } from "../forms/ContentEditorForm";
export default Vue.extend({
  mixins: [dialog],
  props: {
    value: {
      type: Object as () => EpisodeEditorForm,
    },
  },
  data() {
    const showDialog = false;
    return { showDialog };
  },
  methods: {
    updateDialog() {
      this.$emit("updateEpisodeDialog");
    },
    remove() {
      this.$emit("remove");
    },
    async deleteDialog() {
      const isComfirmed = await (this as any).alertConfirm(
        "ลบ Episode",
        `คุณต้องการลบ Episode ${this.value.title} ใช่ไหม?`
      );
      if (isComfirmed) {
        this.remove();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  padding: 1em 3em 1em 3em;
}
</style>
