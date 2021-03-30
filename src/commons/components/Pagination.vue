<template>
  <div class="text-xs-center">
    <v-pagination v-model="currentPage" :length="numberOfPages"></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: Number,
      default: 1,
    },
    numberOfItemPerPage: {
      type: Number,
      default: 10,
    },
    numberOfItems: {
      type: Number,
    },
  },
  computed: {
    currentPage: {
      get(): number {
        return (this as any).value;
      },
      set(currentPage: number) {
        (this as any).$emit("input", currentPage);
      },
    },
    numberOfPages() {
      return Math.ceil(
        (this as any).numberOfItems / (this as any).numberOfItemPerPage
      );
    },
  },
});
</script>
