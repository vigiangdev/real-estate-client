<template>
  <div class="search">
    <SearchBar />
    <div class="all-properties">
      <h2
        v-if="listings.length !== 0 && (query.city || query.postal_code)"
        class="header"
      >
        {{ `${query.city}, ${query.state_code}` || query.postal_code }} Homes
        for Sale
      </h2>
      <div class="properties">
        <CardProperty
          v-for="property in listings"
          v-bind:key="property.property_id"
          v-bind:property="property"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar/SearchBar";
import CardProperty from "@/components/CardProperty";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
    CardProperty,
  },
  computed: {
    ...mapGetters(["listings"]),
    query() {
      return this.$route.query;
    },
  },
  methods: {
    ...mapMutations(["saveQuery", "clearListings"]),
    ...mapActions(["searchListings"]),
  },
  created() {
    this.saveQuery(this.query);
    this.searchListings(this.query);
  },
  watch: {
    $route() {
      this.clearListings();
      this.searchListings(this.query);
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 3rem;
  margin: 2rem;
}

.properties {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>