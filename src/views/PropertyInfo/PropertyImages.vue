<template>
  <div
    v-if="propertyInfo"
    class="images flex flex-col lg:flex-row flex-wrap flex-1 overflow-scroll lg:pr-2 py-2"
  >
    <div
      class="image pb-2 px-1 lg:w-1/2 h-64 overflow-hidden"
      v-for="(photo, index) in propertyInfo.photos"
      v-bind:key="index"
    >
      <img
        class="object-center object-cover w-full h-full"
        v-bind:src="photo.href"
        v-bind:alt="photo.tags[0]"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["propertyInfo"])
  }
};
</script>