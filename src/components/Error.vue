<template>
  <p v-show="error" class="text-red-500 text-xs italic text-center my-2">{{ error }}</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["error"])
  }
};
</script>

<style scoped>
</style>