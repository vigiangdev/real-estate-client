<template>
  <div v-if="propertyInfo" class="lg:sticky top-0 pb-8 border-b">
    <div class="info-building">
      <div class="flex items-center">
        <h3 class="text-3xl flex-1">{{ convertNumToCurrency(propertyInfo.price) }}</h3>
        <span v-on:click="starProperty">
          <i
            class="material-icons md-36 text-teal-500 cursor-pointer hover:text-teal-300"
            v-if="!isFavorite"
          >star_border</i>
          <i
            class="material-icons md-36 text-teal-500 cursor-pointer hover:text-teal-300"
            v-if="isFavorite"
          >star</i>
        </span>
      </div>
      <p class="text-teal-500 text-sm">
        <span>{{ propertyInfo.beds }} beds</span>
        <span class="mx-2">|</span>
        <span v-if="propertyInfo.baths">{{ propertyInfo.baths || 0 }} baths</span>
        <span class="mx-2">|</span>
        <span
          v-if="propertyInfo.building_size"
        >{{ propertyInfo.building_size.size }} {{ propertyInfo.building_size.units }}</span>
      </p>
    </div>
    <div v-if="propertyInfo" class="address text-lg mt-4">
      <div>{{ propertyInfo.address.line }}</div>
      <div>{{ propertyInfo.address.city }}, {{ propertyInfo.address.state_code }} {{propertyInfo.address.postal_code}}</div>
    </div>
    <div
      class="mortgage mt-4"
    >Estimated Payment: {{ convertNumToCurrency(propertyInfo.mortgage.estimate.monthly_payment) }} / month</div>
  </div>
</template>

<script>
import numeral from "numeral";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["propertyInfo", "isFavorite"])
  },
  methods: {
    ...mapMutations(["checkFavorite"]),
    ...mapActions(["getFavorites", "saveFavorite", "deleteFavorite"]),
    convertNumToCurrency(value) {
      return numeral(value).format("$ 0,0[.]00");
    },
    starProperty() {
      const propertyId = this.$route.params.property_id;
      if (this.isFavorite) {
        this.deleteFavorite(propertyId);
      } else {
        this.saveFavorite(propertyId);
      }
    }
  },
  async created() {
    await this.getFavorites();
    this.checkFavorite(this.$route.params.property_id);
  }
};
</script>