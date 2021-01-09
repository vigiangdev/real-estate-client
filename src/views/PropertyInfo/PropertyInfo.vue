<template>
  <div class="display-property container mx-auto lg:flex justify-center">
    <PropertyImages class />
    <div class="info lg:w-96 mt-4 ml-4 flex flex-col">
      <PropertyGeneralInfo />
      <PropertyDescription />
    </div>
  </div>
</template>

<script>
import PropertyDescription from "./PropertyDescription";
import PropertyGeneralInfo from "./PropertyGeneralInfo";
import PropertyImages from "./PropertyImages";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PropertyDescription,
    PropertyGeneralInfo,
    PropertyImages,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["searchProperty"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.searchProperty(this.$route.params.property_id);
  },
};
</script>

<style scoped>
.display-property {
  height: calc(100vh - 4rem);
}
</style>
