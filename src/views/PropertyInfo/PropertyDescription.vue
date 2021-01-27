<template>
  <div v-if="propertyInfo">
    <div v-if="propertyInfo.description" class="container">
      <h1>Description</h1>
      <p class="feature">{{ propertyInfo.description }}</p>
    </div>
    <div class="container">
      <h1>Features</h1>
      <div></div>
      <div class="feature" v-if="propertyInfo.year_built">
        Year Built: {{ propertyInfo.year_built }}
      </div>
      <div class="feature" v-if="propertyInfo.garage">
        Garage: {{ propertyInfo.garage }}
      </div>
      <div class="feature" v-if="propertyInfo.heating">
        Heating: {{ propertyInfo.heating }}
      </div>
      <div class="feature" v-if="propertyInfo.cooling">
        Cooling: {{ propertyInfo.cooling }}
      </div>
      <div
        v-for="(feature, index) in propertyInfo.features"
        v-bind:key="index"
        class="container"
      >
        <h2>{{ feature.category }}</h2>
        <ul v-for="(element, index) in feature.text" v-bind:key="index">
          <li class="feature">{{ element }}</li>
        </ul>
      </div>
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
    ...mapGetters(["propertyInfo"]),
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.4rem;
  font-weight: bold;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
}
.container {
  padding: 0.8rem 0;
}

.feature {
  font-size: 1.6rem;
}
</style>