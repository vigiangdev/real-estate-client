<template>
  <div v-if="propertyInfo" class="image-container">
    <div
      class="image"
      v-for="(photo, index) in propertyInfo.photos"
      v-bind:key="index"
    >
      <img v-bind:src="photo.href" v-bind:alt="photo.tags[0]" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["propertyInfo"]),
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  padding: 3rem 0.8rem;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0.8rem;
}

img {
  max-width: 100%;
  max-height: 100%;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
  .image {
    width: 50%;
  }
}

@media (min-width: 1200px) {
}

@media (min-width: 1440px) {
}
</style>