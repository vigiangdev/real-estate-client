<template>
  <div class="search-form">
    <div class="backdrop" v-on:click="showList = false" v-if="showList"></div>
    <div class="foreground">
      <form
        v-on:enter.prevent="autocompleteLocationFirstHouse"
        class="foreground form"
      >
        <input
          type="text"
          name="search-location"
          placeholder="Search city or postal code..."
          v-debounce:500ms="autocompleteLocationHouse"
          v-model="searchLocation"
        />
      </form>

      <div
        v-if="autocompleteResults && showList"
        class="foreground autocomplete"
      >
        <ul
          v-for="(result, index) in autocompleteResults"
          v-bind:key="index"
          class="autocomplete-list"
        >
          <li
            v-if="result.area_type === 'postal_code'"
            v-on:click="selectLocationHouse(result)"
          >
            {{ result.postal_code }}, {{ result.state_code }}
          </li>
          <li
            v-if="result.area_type === 'city'"
            v-on:click="selectLocationHouse(result)"
          >
            {{ result.city }}, {{ result.state_code }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SearchLocationText",
  data() {
    return {
      searchLocation: "",
      showList: false,
    };
  },
  computed: {
    ...mapGetters(["autocompleteResults"]),
  },
  methods: {
    ...mapMutations(["selectLocation", "autocompleteReset"]),
    ...mapActions(["autocompleteLocation"]),

    clickBackdrop() {
      this.showList = false;
    },

    async autocompleteLocationHouse() {
      this.showList = true;
      await this.autocompleteLocation(this.searchLocation);
    },

    selectLocationHouse(location) {
      this.showList = false;
      if (location.area_type === "city") {
        this.searchLocation =
          `${location.city}, ${location.state_code}` ||
          `${location.postal_code}, ${location.state_code}`;
      } else if (location.area_type === "postal_code") {
        this.searchLocation = location.postal_code;
      }
      this.selectLocation(location);
      this.autocompleteReset();
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.foreground {
  position: relative;
}

input[type="text"] {
  font-size: 1.6rem;
  height: 3rem;
  padding: 0 0.5rem;
  width: 100%;
  border: 1px solid teal;
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.25);
}

input[type="text"]:focus {
  outline: none;
}

.autocomplete {
  position: absolute;
  font-size: 1.6rem;
  background-color: white;
  width: 100%;
  z-index: 2;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.25);
}

.autocomplete-list {
  padding: 0.8rem;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-top: none;
}

.autocomplete-list:hover {
  background-color: teal;
  cursor: default;
  color: white;
}

@media (min-width: 992px) {
  .form {
    width: 250px;
  }
  .autocomplete {
    width: 250px;
  }
}
</style>