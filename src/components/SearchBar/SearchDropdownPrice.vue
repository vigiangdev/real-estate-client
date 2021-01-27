<template>
  <dropdown-menu>
    <template v-slot:title>
      <span v-if="query.price_min && query.price_max"
        >{{ convertNumToCurrency(query.price_min, "short") }} -
        {{ convertNumToCurrency(query.price_max, "short") }}</span
      >
      <span v-else-if="query.price_min"
        >{{ convertNumToCurrency(query.price_min, "short") }} - Unlimited</span
      >
      <span v-else-if="query.price_max"
        >$ 0 - {{ convertNumToCurrency(query.price_max, "short") }}</span
      >
      <span v-else>Price</span>
    </template>

    <template v-slot:fields>
      <div class="field">
        <label for="min-price">Minimum:</label>
        <select
          v-if="query.price_max"
          v-model="price_min"
          name="min-price"
          id="min-price"
        >
          <option
            v-for="(price, index) in priceMinSlice"
            v-bind:value="price"
            v-bind:key="index"
          >
            {{ convertNumToCurrency(price, "long") }}
          </option>
        </select>
        <select v-else v-model="price_min" name="min-price" id="min-price">
          <option
            v-for="(price, index) in optionPrice"
            v-bind:value="price"
            v-bind:key="index"
          >
            {{ convertNumToCurrency(price, "long") }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="max-price">Maximum:</label>
        <select
          v-if="query.price_min"
          v-model="price_max"
          name="max-price"
          id="max-price"
        >
          <option
            v-for="(price, index) in priceMaxSlice"
            v-bind:value="price"
            v-bind:key="index"
          >
            {{ convertNumToCurrency(price, "long") }}
          </option>
        </select>
        <select v-else v-model="price_max" name="max-price" id="max-price">
          <option
            v-for="(price, index) in optionPrice"
            v-bind:value="price"
            v-bind:key="index"
          >
            {{ convertNumToCurrency(price, "long") }}
          </option>
        </select>
      </div>
    </template>
  </dropdown-menu>
</template>

<script>
import numeral from "numeral";
import DropdownMenu from "../DropdownMenu";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SearchDropdownPrice",
  components: {
    "dropdown-menu": DropdownMenu,
  },
  data() {
    return {
      optionPrice: [
        0,
        100000,
        200000,
        300000,
        400000,
        500000,
        600000,
        700000,
        800000,
        900000,
        1000000,
        1250000,
        1500000,
        1750000,
        2000000,
        5000000,
        10000000,
        20000000,
        50000000,
      ],
    };
  },
  computed: {
    ...mapGetters(["query"]),
    price_min: {
      get() {
        return this.query.price_min;
      },
      set(price) {
        this.selectMinPrice(price);
      },
    },
    price_max: {
      get() {
        return this.query.price_max;
      },
      set(price) {
        this.selectMaxPrice(price);
      },
    },
    priceMinSlice() {
      return this.optionPrice.slice(
        0,
        this.optionPrice.indexOf(this.query.price_max)
      );
    },
    priceMaxSlice() {
      return this.optionPrice.slice(
        this.optionPrice.indexOf(this.query.price_min) + 1,
        this.optionPrice.length
      );
    },
  },
  methods: {
    ...mapMutations(["selectMinPrice", "selectMaxPrice"]),
    convertNumToCurrency(value, length) {
      if (length === "long") {
        return numeral(value).format("$ 0,0[.]00");
      } else if (length === "short") {
        return numeral(value).format("$ 0.00 a");
      } else {
        return numeral(value).format("$ 0,0[.]00");
      }
    },
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