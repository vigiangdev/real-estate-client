<template>
  <dropdown-menu>
    <template v-slot:title>
      <span v-if="query.beds_min">{{ query.beds_min }}+</span>
      Beds &
      <span v-if="query.baths_min">{{ query.baths_min }}+</span>
      Baths
    </template>

    <template v-slot:fields>
      <div class="field">
        <label for="beds">Bedroom:</label>
        <select name="beds" id="beds" v-model="beds_min">
          <option
            v-for="(n, index) in 6"
            v-bind:value="n - 1"
            v-bind:key="index"
          >
            {{ n - 1 }}+
          </option>
        </select>
      </div>
      <div class="field">
        <label for="baths">Bathroom:</label>
        <select name="baths" id="baths" v-model="baths_min">
          <option
            v-for="(n, index) in 6"
            v-bind:value="n - 1"
            v-bind:key="index"
          >
            {{ n - 1 }}+
          </option>
        </select>
      </div>
    </template>
  </dropdown-menu>
</template>

<script>
import DropdownMenu from "../DropdownMenu";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SearchDropdownBedBath",
  components: {
    DropdownMenu,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["query"]),
    beds_min: {
      get() {
        return this.query.beds_min;
      },
      set(bedsNum) {
        this.selectBeds(bedsNum);
      },
    },
    baths_min: {
      get() {
        return this.query.baths_min;
      },
      set(bathsNum) {
        this.selectBaths(bathsNum);
      },
    },
  },
  methods: {
    ...mapMutations(["selectBeds", "selectBaths"]),
  },
};
</script>

<style scoped>
select {
  border: 1px solid lightgray;
  font-size: 1.6rem;
  width: 100%;
}

select:focus {
  outline: 1px solid teal;
}

.field {
  padding: 1rem 0;
}
</style>