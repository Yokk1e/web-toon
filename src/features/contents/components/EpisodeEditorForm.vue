<template>
  <v-card outlined>
    <div>
      <v-text-field
        v-model="title"
        label="Title"
        outlined
        dense
        :error-messages="titleError"
      ></v-text-field>
      <v-text-field v-model="name" label="Name" outlined dense></v-text-field>
      <v-text-field
        v-model="descriptiom"
        label="Description"
        outlined
        dense
      ></v-text-field>
      <v-text-field v-model="link" label="Link" outlined dense></v-text-field>
    </div>
    <div>
      <v-btn class="mx-2" small fab dark color="error" @click="remove">
        <v-icon dark>mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { proxyModel } from "@/commons/utils/proxyModel";
import { EpisodeEditorForm } from "../forms/ContentEditorForm";
export default Vue.extend({
  props: {
    value: {
      type: Object as () => EpisodeEditorForm,
    },
    validation: {
      type: Object,
    },
  },
  computed: {
    ...proxyModel("id", "title", "name", "description", "link"),
    titleError() {
      return (this as any).validations.title.$error
        ? "Title is required or invalid"
        : "";
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
  },
});
</script>
<style lang="scss" scoped></style>
