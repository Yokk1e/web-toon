<template>
  <div>
    <v-img max-height="300" max-width="300" :src="imageUrl"></v-img>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      prepend-icon="mdi-camera"
      label="Image"
      @change="fileChange"
      :error-messages="fileError"
    ></v-file-input>
    <v-text-field
      v-model="name"
      label="Title"
      outlined
      dense
      :error-messages="nameError"
    ></v-text-field>
    <v-text-field
      v-model="description"
      label="Description"
      outlined
      dense
      :error-messages="descriptionError"
    ></v-text-field>
    <div>
      <episode-group-card v-model="episodes"></episode-group-card>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ContentEditorForm } from "../forms/ContentEditorForm";
import EpisodeGroupCard from "./EpisodeGroupCard.vue";
import { proxyModel } from "@/commons/utils/proxyModel";
export default Vue.extend({
  components: {
    EpisodeGroupCard,
  },
  props: {
    value: {
      type: Object as () => ContentEditorForm,
    },
    validations: {
      type: Object,
    },
    imageUrl: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  computed: {
    ...proxyModel("id", "name", "description", "episodes", "file"),
    nameError() {
      return (this as any).validations.name.$error
        ? "Name is require or invalid"
        : "";
    },
    descriptionError() {
      return (this as any).validations.description.$error
        ? "Description is require or invalid"
        : "";
    },
    fileError() {
      if (!((this as any).state == "UPDATE")) {
        return (this as any).validations.file.$error
          ? "Image is require or invalid"
          : "";
      }
      return "";
    },
   
  },
  methods: {
    fileChange(e: any) {
      this.$emit('changeUrl', URL.createObjectURL(e));
      (this as any).file = e;
    },
  },
});
</script>
<style lang="scss" scoped></style>
