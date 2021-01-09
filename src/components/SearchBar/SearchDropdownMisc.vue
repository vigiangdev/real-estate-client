<template>
  <dropdown-menu>
    <template v-slot:title> More </template>
    <template v-slot:fields>
      <slot name="dropdown-fields">
        <div class="field">
          <h3>Sort By:</h3>
          <select name="sort" id="sort" v-model="sort">
            <option
              v-for="(option, key) in sortOptions"
              v-bind:key="key"
              :value="key"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <div class="field">
          <h3>Year Built:</h3>
          <div>
            <input
              type="number"
              name="age-min"
              placeholder="Minimum"
              v-model="age_min"
            />
            <span>-</span>
            <input
              type="number"
              name="age-max"
              placeholder="Maximum"
              v-model="age_max"
            />
          </div>
        </div>

        <div class="field">
          <h3>Property Size:</h3>
          <label for="sqft-min"></label>
          <select
            v-if="query.sqft_max"
            name="sqft-min"
            id="sqft-min"
            v-model="sqft_min"
          >
            <option
              v-for="(size, index) in sqFtMinSlice"
              v-bind:key="index"
              v-bind:value="size"
            >
              {{ size.toLocaleString() + " Sq. Ft" }}
            </option>
          </select>

          <select v-else name="sqft-min" id="sqft-min" v-model="sqft_min">
            <option
              v-for="(size, index) in optionSqFt"
              v-bind:key="index"
              v-bind:value="size"
            >
              {{ size.toLocaleString() + " Sq. Ft" }}
            </option>
          </select>

          <span>-</span>
          <label for="sqft-max"></label>
          <select
            v-if="query.sqft_min"
            name="sqft-max"
            id="sqft-max"
            v-model="sqft_max"
          >
            <option
              v-for="(size, index) in sqFtMaxSlice"
              v-bind:key="index"
              v-bind:value="size"
            >
              {{ size.toLocaleString() + " Sq. Ft" }}
            </option>
          </select>

          <select v-else name="sqft-max" id="sqft-max" v-model="sqft_max">
            <option
              v-for="(size, index) in optionSqFt"
              v-bind:key="index"
              v-bind:value="size"
            >
              {{ size.toLocaleString() + " Sq. Ft" }}
            </option>
          </select>
        </div>

        <div class="field">
          <h3>Lot Size:</h3>
          <label for="lot-sqft-min"></label>
          <select
            v-if="query.lot_sqft_max"
            name="lot-sqft-min"
            id="lot-sqft-min"
            v-model="lot_sqft_min"
          >
            <option
              v-for="size in lotSqFtMinSlice"
              v-bind:key="size.display"
              v-bind:value="size.value"
            >
              {{ size.display }}
            </option>
          </select>

          <select
            v-else
            name="lot-sqft-min"
            id="lot-sqft-min"
            v-model="lot_sqft_min"
          >
            <option
              v-for="size in optionLotSize"
              v-bind:key="size.display"
              v-bind:value="size.value"
            >
              {{ size.display }}
            </option>
          </select>

          <span>-</span>
          <label for="lot-sqft-max"></label>
          <select
            v-if="query.lot_sqft_min"
            name="lot-sqft-max"
            id="lot-sqft-max"
            v-model="lot_sqft_max"
          >
            <option
              v-for="size in lotSqFtMaxSlice"
              v-bind:key="size.display"
              v-bind:value="size.value"
            >
              {{ size.display }}
            </option>
          </select>

          <select
            v-else
            name="lot-sqft-max"
            id="lot-sqft-max"
            v-model="lot_sqft_max"
          >
            <option
              v-for="size in optionLotSize"
              v-bind:key="size.display"
              v-bind:value="size.value"
            >
              {{ size.display }}
            </option>
          </select>
        </div>

        <div class="field">
          <input
            type="checkbox"
            name="foreclosure"
            value="foreclosure"
            v-model="is_foreclosure"
          />
          <label for="foreclosure">Foreclosure</label>
        </div>

        <div class="field">
          <input type="checkbox" name="open-house" v-model="has_open_house" />
          <label for="open-house">Open House</label>
        </div>

        <div class="field">
          <div>
            <h3>Property Type</h3>
          </div>

          <div>
            <input
              type="checkbox"
              name="single-family"
              v-model="prop_type['single_family']"
              v-on:change="constructPropTypeString()"
            />

            <label for="single-family">Single Family</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="multi-family"
              v-model="prop_type['multi_family']"
              v-on:change="constructPropTypeString()"
            />

            <label for="multi-family">Multi-Family</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="Condo"
              v-model="prop_type['condo']"
              v-on:change="constructPropTypeString()"
            />

            <label for="condo">Condo</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="mobile"
              v-model="prop_type['mobile']"
              v-on:change="constructPropTypeString()"
            />

            <label for="mobile">Mobile</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="land"
              value="land"
              v-model="prop_type['land']"
              v-on:change="constructPropTypeString()"
            />

            <label for="land">Land</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="farm"
              v-model="prop_type['farm']"
              v-on:change="constructPropTypeString()"
            />

            <label for="farm">Farm</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="other"
              v-model="prop_type['other']"
              v-on:change="constructPropTypeString()"
            />

            <label for="other">Other</label>
          </div>
        </div>
      </slot>
    </template>
  </dropdown-menu>
</template>

<script>
import DropdownMenu from "../DropdownMenu";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SearchDropdownMisc",
  components: {
    DropdownMenu,
  },
  data() {
    return {
      prop_type: {},
      sortOptions: {
        relevance: "Relevance",
        newest: "Newest",
        price_low: "Lowest Price",
        price_high: "Highest Price",
        open_house_date: "Open House Date",
        sqft_high: "Highest Square Footage",
      },
      optionSqFt: [
        0,
        500,
        750,
        1000,
        1250,
        1500,
        1750,
        2000,
        2500,
        3000,
        3500,
        4000,
        5000,
        7500,
        10000,
      ],
      optionLotSize: [
        { display: "0 Sq. Ft", value: 0 },
        { display: "1000 Sq. Ft", value: 1000 },
        { display: "2000 Sq. Ft", value: 2000 },
        { display: "3000 Sq. Ft", value: 3000 },
        { display: "4000 Sq. Ft", value: 4000 },
        { display: "5000 Sq. Ft", value: 5000 },
        { display: "7500 Sq. Ft", value: 7500 },
        { display: "1/4 Acre", value: this.acreToSqFt(1 / 4) },
        { display: "1/2 Acre", value: this.acreToSqFt(1 / 2) },
        { display: "1 Acre", value: this.acreToSqFt(1) },
        { display: "2 Acre", value: this.acreToSqFt(2) },
        { display: "5 Acre", value: this.acreToSqFt(5) },
        { display: "10 Acre", value: this.acreToSqFt(10) },
        { display: "25 Acre", value: this.acreToSqFt(25) },
        { display: "50 Acre", value: this.acreToSqFt(50) },
        { display: "100 Acre", value: this.acreToSqFt(100) },
      ],
    };
  },
  computed: {
    ...mapGetters(["query"]),
    sqFtMinSlice() {
      return this.optionSqFt.slice(
        0,
        this.optionSqFt.indexOf(this.query.sqft_max)
      );
    },
    sqFtMaxSlice() {
      return this.optionSqFt.slice(
        this.optionSqFt.indexOf(this.query.sqft_min) + 1,
        this.optionSqFt.length
      );
    },
    lotSqFtMinSlice() {
      return this.optionLotSize.slice(
        0,
        this.optionLotSize.findIndex(
          (el) => el.value === this.query.lot_sqft_max
        )
      );
    },
    lotSqFtMaxSlice() {
      return this.optionLotSize.slice(
        this.optionLotSize.findIndex(
          (el) => el.value === this.query.lot_sqft_min
        ) + 1,
        this.optionLotSize.length
      );
    },
    sort: {
      get() {
        return this.query.sort;
      },
      set(value) {
        this.selectSort(value);
      },
    },
    age_min: {
      get() {
        return this.query.age_min;
      },
      set(value) {
        this.selectMinAge(value);
      },
    },
    age_max: {
      get() {
        return this.query.age_max;
      },
      set(value) {
        this.selectMaxAge(value);
      },
    },
    sqft_min: {
      get() {
        return this.query.sqft_min;
      },
      set(value) {
        this.selectMinSqFt(value);
      },
    },
    sqft_max: {
      get() {
        return this.query.sqft_max;
      },
      set(value) {
        this.selectMaxSqFt(value);
      },
    },
    lot_sqft_min: {
      get() {
        return this.query.lot_sqft_min;
      },
      set(value) {
        this.selectMinLotSqFt(value);
      },
    },
    lot_sqft_max: {
      get() {
        return this.query.lot_sqft_max;
      },
      set(value) {
        this.selectMaxLotSqFt(value);
      },
    },
    is_foreclosure: {
      get() {
        return this.query.is_foreclosure;
      },
      set(value) {
        this.selectIsForeclosure(value);
      },
    },
    has_open_house: {
      get() {
        return this.query.has_open_house;
      },
      set(value) {
        this.selectHasOpenHouse(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "selectSort",
      "selectMinAge",
      "selectMaxAge",
      "selectMinSqFt",
      "selectMaxSqFt",
      "selectMinLotSqFt",
      "selectMaxLotSqFt",
      "selectIsForeclosure",
      "selectHasOpenHouse",
      "selectPropType",
    ]),
    acreToSqFt(acre) {
      return acre * 43560;
    },
    constructPropTypeString() {
      let constructor = [];
      for (let [key, value] of Object.entries(this.prop_type)) {
        if (value === true) {
          constructor.push(key);
        }
      }
      const propTypeString = constructor.join(",");
      this.selectPropType(propTypeString);
    },
  },
};
</script>

<style scoped>
input[type="text"],
input[type="number"] {
  padding: 0.8rem;
  width: 100%;
}

select {
  padding: 0.8rem;
  width: 100%;
}

.field {
  padding: 1rem 0;
}
</style>