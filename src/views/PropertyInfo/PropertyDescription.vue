<template>
  <div v-if="propertyInfo" class="description overflow-scroll lg:pr-6 pb-6">
    <div class="border-gray-400 pt-2">
      <h4 class="text-2xl font-bold">Description</h4>
      <p>{{ propertyInfo.description }}</p>
    </div>
    <div class="features mt-8 border-t border-gray-400 pt-2">
      <h3 class="text-2xl font-bold">Features</h3>
      <div class="type"></div>
      <div>Year Built: {{ propertyInfo.year_built }}</div>
      <div>Garage: {{ propertyInfo.garage }}</div>
      <div>Heating: {{ propertyInfo.heating }}</div>
      <div>Cooling: {{ propertyInfo.cooling }}</div>

      <div class="mt-4" v-for="(feature, index) in propertyInfo.features" v-bind:key="index">
        <h3 class="text-lg font-medium">{{ feature.category }}</h3>
        <ul v-for="(element, index) in feature.text" v-bind:key="index">
          <li>{{ element }}</li>
        </ul>
      </div>
    </div>
    <div v-if="propertyInfo.broker" class="broker mt-8 border-t border-gray-400 pt-2">
      <h3 class="text-2xl font-bold">Broker</h3>
      <div>Name: {{ propertyInfo.broker.name }}</div>
      <!-- <div>Phone: {{ propertyInfo.broker.phone1.number }}</div> -->
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