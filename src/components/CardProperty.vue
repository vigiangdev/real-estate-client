<template>
  <router-link
    v-if="property.listing_id"
    :to="{
      name: 'PropertyInfo',
      params: { property_id: property.property_id },
    }"
  >
    <div class="card">
      <div class="image-container">
        <img v-bind:src="property.thumbnail" alt="property picture" />
      </div>

      <div class="property">
        <p class="rooms">
          <span v-if="property.beds">{{ property.beds }} beds</span>
          <span v-if="property.beds" class="separator">|</span>
          <span v-if="property.baths">{{ property.baths || 0 }} baths</span>
          <span v-if="property.baths" class="separator">|</span>
          <span v-if="property.building_size"
            >{{ property.building_size.size }}
            {{ property.building_size.units }}</span
          >
        </p>
        <h3 class="address">
          {{ property.address.line }}
          {{ property.address.city }}, {{ property.address.state_code }}
          {{ property.address.postal_code }}
        </h3>
        <p class="price">
          {{ convertNumToCurrency(property.price) }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import numeral from "numeral";

export default {
  props: ["property"],
  data() {
    return {};
  },
  methods: {
    convertNumToCurrency(value) {
      return numeral(value).format("$ 0,0[.]00");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.card {
  position: relative;
  width: 380px;
  height: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgb(0, 0, 0, 0.5);
  margin: 1rem;
  transition: all ease-in-out 0.3s;
}

.card:hover {
  transform: scale(1.025);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.image-container {
  overflow: hidden;
  height: 80%;
}

.image-container img {
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
}

.property {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.4rem;
  padding: 1.6rem;
  height: 20%;
}

.rooms {
  color: teal;
  font-weight: bold;
}

.separator {
  padding: 0 1rem;
}

.rooms,
.address {
  padding: 0.2rem 0;
}

.price {
  position: absolute;
  right: 0;
  top: 0;
  font-weight: bold;
  color: teal;
  background-color: white;
  padding: 0.75rem;
}
</style>