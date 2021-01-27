<template>
  <div v-if="propertyInfo">
    <h3 class="price">{{ convertNumToCurrency(propertyInfo.price) }}</h3>
    <div class="property-info container">
      <span v-if="propertyInfo.beds">{{ propertyInfo.beds }} beds</span>
      <span v-if="propertyInfo.beds" class="separator">|</span>
      <span v-if="propertyInfo.baths">{{ propertyInfo.baths }} baths</span>
      <span v-if="propertyInfo.baths" class="separator">|</span>
      <span v-if="propertyInfo.building_size"
        >{{ propertyInfo.building_size.size }}
        {{ propertyInfo.building_size.units }}</span
      >
    </div>
    <div v-if="propertyInfo" class="address container">
      <div>{{ propertyInfo.address.line }}</div>
      <div>
        {{ propertyInfo.address.city }}, {{ propertyInfo.address.state_code }}
        {{ propertyInfo.address.postal_code }}
      </div>
    </div>
    <div class="payment container">
      Estimated Payment:
      {{ convertNumToCurrency(propertyInfo.mortgage.estimate.monthly_payment) }}
      / month
    </div>
    <span v-on:click="starProperty" class="favorite">
      <i v-if="!isFavorite">star_border</i>
      <i v-if="isFavorite">star</i>
    </span>
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
    ...mapGetters(["propertyInfo", "isFavorite"]),
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
    },
  },
  // async created() {
  //   await this.getFavorites();
  //   this.checkFavorite(this.$route.params.property_id);
  // },
};
</script>

<style scoped>
.price {
  font-size: 3rem;
}

.property-info {
  color: teal;
  font-size: 1.6rem;
}

.separator {
  padding: 0 1rem;
}

.address {
  font-size: 1.6rem;
}

.payment {
  font-size: 1.6rem;
}

.container {
  padding: 0.8rem 0;
}
</style>