<template>
  <div class="searchbar">
    <SearchLocationText class="dropdown-item" />
    <div class="dropdown-items">
      <SearchDropdownPrice class="dropdown-item" />
      <SearchDropdownBedBath class="dropdown-item" />
      <SearchDropdownMisc class="dropdown-item" />
      <Button class="dropdown-item">
        <template v-slot:default>
          <span v-on:click="redirectSearch">Search</span>
        </template>
      </Button>
    </div>
  </div>
</template>

<script>
import SearchLocationText from "./SearchLocationText";
import SearchDropdownPrice from "./SearchDropdownPrice";
import SearchDropdownBedBath from "./SearchDropdownBedBath";
import SearchDropdownMisc from "./SearchDropdownMisc";
import Button from "@/components/Button";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Button,
    SearchLocationText,
    SearchDropdownPrice,
    SearchDropdownBedBath,
    SearchDropdownMisc,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["query"]),
    queryLean() {
      let newQuery = {};
      Object.keys(this.query).forEach((el) => {
        if (this.query[el]) {
          newQuery[el] = this.query[el];
        }
      });
      return newQuery;
    },
  },
  methods: {
    ...mapActions(["searchListings"]),
    redirectSearch() {
      this.$router.push({ name: "Search", query: this.queryLean });
    },
  },
};
2;
</script>

<style scoped>
.searchbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  padding: 0.5rem;
}

.dropdown-items {
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  margin: 0.25rem;
}

@media (min-width: 640px) {
  .dropdown-items {
    flex-direction: row;
  }
}

@media (min-width: 992px) {
  .searchbar {
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>