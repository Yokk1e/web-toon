<template>
  <div>
    <v-btn class="mb-4" color="primary" @click="createDialog"
      >เพิ่ม Episode</v-btn
    >
    <episode-card
      v-for="(episode, index) in episodes"
      :key="index"
      :value="episode"
      @updateEpisodeDialog="updateDialog(index)"
      @remove="removeEpisode(index)"
    ></episode-card>
    <v-dialog v-model="showDialog" max-width="600" persistent>
      <episode-editor
        v-model="episodeForm"
        :validation="this.$v.episodeForm"
        :state="dialogState"
        @close="closeDialog"
        @updateEpisode="updateEpisode"
        @addEpisode="addEpisode"
      ></episode-editor>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import { EpisodeEditorForm } from "../forms/ContentEditorForm";
import EpisodeEditor, { DialogState } from "./EpisodeEditorForm.vue";
import EpisodeCard from "./EpisodeCard.vue";
export default Vue.extend({
  components: {
    EpisodeCard,
    EpisodeEditor,
  },
  validations: {
    episodeForm: {
      title: { required },
    },
  },
  props: {
    value: {
      type: Array as () => EpisodeEditorForm[],
    },
  },
  data() {
    const showDialog = false;
    const dialogState = DialogState.CREATE;
    const indexEpisode = 0;
    const episodeForm: EpisodeEditorForm = {
      title: "",
    };
    return { showDialog, episodeForm, dialogState, indexEpisode };
  },
  computed: {
    episodes: {
      get(): EpisodeEditorForm[] {
        return this.value;
      },
      set(episodeEditorForm: EpisodeEditorForm[]) {
        (this as any).$emit("input", episodeEditorForm);
      },
    },
  },
  methods: {
    createDialog() {
      this.dialogState = DialogState.CREATE;
      this.openDialog();
    },
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.episodeForm = { title: "" };
    },
    updateDialog(index: number) {
      this.dialogState = DialogState.UPDATE;
      const episode = this.episodes.find((_, i) => i === index);
      this.episodeForm = episode ? episode : { title: "" };
      this.indexEpisode = index;
      this.openDialog();
    },
    addEpisode() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.episodes = [...this.episodes, this.episodeForm];
      this.$v.$reset();
      this.closeDialog();
    },
    updateEpisode() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.episodes = this.episodes.map((episode, i) => {
        if (i == this.indexEpisode) {
          return this.episodeForm;
        } else {
          return episode;
        }
      });
      this.$v.$reset();
      this.closeDialog();
    },
    removeEpisode(index: number) {
      this.episodes = this.episodes.filter((_: any, i: number) => {
        return index !== i;
      });
    },
  },
});
</script>
<style lang="scss" scoped></style>
