<template>
  <v-card class="group-card" outlined>
    <div>
      <h2 class="mb-3">Episodes</h2>
      <v-text-field
        v-model="title"
        label="Title"
        outlined
        dense
        :error-messages="titleError"
      ></v-text-field>
      <v-text-field v-model="name" label="Name" outlined dense></v-text-field>
      <v-text-field
        v-model="description"
        label="Description"
        outlined
        dense
      ></v-text-field>
      <v-text-field v-model="link" label="Link" outlined dense></v-text-field>
    </div>
    <div class="text-right">
      <v-btn class="mx-2" @click="closeDialog">
        Close
      </v-btn>

      <v-btn
        v-if="isStateCreate"
        class="mx-2"
        color="success"
        @click="addEpisode"
      >
        Add
      </v-btn>
      <v-btn v-else class="mx-2" color="warning" @click="updateEpisode">
        Update
      </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { EpisodeEditorForm } from "../forms/ContentEditorForm";
export enum DialogState {
  CREATE = "create",
  UPDATE = "update",
}
export default Vue.extend({
  props: {
    value: {
      type: Object as () => EpisodeEditorForm,
      default: () => {
        return { title: "", description: "", name: "", link: "" };
      },
    },
    validation: {
      type: Object,
    },
    state: {
      type: String,
    },
  },
  computed: {
    ...proxyModel("id", "title", "name", "description", "link"),
    titleError() {
      return (this as any).validation.title.$error
        ? "Title is required or invalid"
        : "";
    },
    isStateCreate() {
      return this.state == DialogState.CREATE;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    addEpisode() {
      this.$emit("addEpisode");
    },
    updateEpisode() {
      this.$emit("updateEpisode");
    },
  },
});
</script>
<style lang="scss" scoped>
.group-card {
  padding: 20px;
}
</style>
