<template>
  <div>
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
    ></v-text-field>
    <v-btn class="mx-2" small fab dark color="primary" @click="addEpisode">
      <v-icon dark>mdi-plus</v-icon>
      Add Episode
    </v-btn>
    <div>
      <episode-editor-form
        v-for="(episode, index) in episodes"
        :key="index"
        :value="episode"
        :validation="validation.episodes.$each[index]"
        @remove="removeEpisode(index)"
      >
      </episode-editor-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { ContentEditorForm } from "../forms/ContentEditorForm";
import EpisodeEditorForm from "./EpisodeEditorForm.vue";
import { proxyModel } from "@/commons/utils/proxyModel";
export default Vue.extend({
  components: {
    EpisodeEditorForm,
  },
  props: {
    value: {
      type: Object as () => ContentEditorForm,
    },
    validations: {
      type: Object,
    },
  },
  computed: {
    ...proxyModel("id", "name", "description", "episodes"),
    nameError() {
      this.validations.name.$error ? "Name is require or invalid" : "";
    },
  },
  methods: {
    addEpisode() {
      (this as any).episodes = [
        ...(this as any).episodes,
        {
          title: "",
          name: "",
          description: "",
          link: "",
        },
      ];
    },
    removeEpisode(index: number) {
      (this as any).episodes = (this as any).episodes.filter(
        (_: any, i: number) => {
          return index !== i;
        }
      );
    },
  },
});
</script>
<style lang="scss" scoped></style>
