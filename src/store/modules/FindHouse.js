import axios from "axios";

const state = {
  status: null,
  error: null,
  autocompleteResults: [],
  listings: [],
  query: {
    sort: null,
    city: null,
    state_code: null,
    postal_code: null,
    offset: 0,
    limit: 50,
    age_min: null,
    age_max: null,
    beds_min: null,
    baths_min: null,
    price_min: null,
    price_max: null,
    sqft_min: null,
    sqft_max: null,
    lot_sqft_min: null,
    lot_sqft_max: null,
    has_open_house: null,
    is_foreclosure: null,
    prop_type: null,
    features: null,
  },
};
const getters = {
  autocompleteResults(state) {
    return state.autocompleteResults;
  },
  query(state) {
    return state.query;
  },
  listings(state) {
    return state.listings;
  },
};
const mutations = {
  autocompleteRequest(state) {
    state.status = "loading";
    state.error = null;
  },
  autocompleteSuccess(state, locations) {
    state.autocompleteResults = locations;
    state.status = "success";
  },
  autocompleteError(state) {
    state.status = "error";
  },
  autocompleteReset(state) {
    state.autocompleteResults = [];
  },
  selectLocation(state, location) {
    state.query.city = null;
    state.query.postal_code = null;
    state.query.state_code = null;

    if (location.area_type === "city") {
      state.query.city = location.city;
      state.query.state_code = location.state_code;
    } else if (location.area_type === "postal_code") {
      state.query.postal_code = location.postal_code;
    }
  },
  selectSort(state, sort) {
    state.query.sort = sort;
  },
  selectMinPrice(state, price) {
    state.query.price_min = price;
  },
  selectMaxPrice(state, price) {
    state.query.price_max = price;
  },
  selectBeds(state, beds) {
    state.query.beds_min = beds;
  },
  selectBaths(state, baths) {
    state.query.baths_min = baths;
  },
  selectMinAge(state, age) {
    state.query.age_min = age;
  },
  selectMaxAge(state, age) {
    state.query.age_max = age;
  },
  selectMinSqFt(state, sqft) {
    state.query.sqft_min = sqft;
  },
  selectMaxSqFt(state, sqft) {
    state.query.sqft_max = sqft;
  },
  selectMinLotSqFt(state, sqft) {
    state.query.lot_sqft_min = sqft;
  },
  selectMaxLotSqFt(state, sqft) {
    state.query.lot_sqft_max = sqft;
  },
  selectIsForeclosure(state, value) {
    state.query.is_foreclosure = value;
  },
  selectHasOpenHouse(state, value) {
    state.query.has_open_house = value;
  },
  selectPropType(state, value) {
    state.query.prop_type = value;
  },
  saveListingsRequest(state) {
    state.status = "loading";
    state.error = null;
  },
  saveListingsSuccess(state, listings) {
    state.status = "success";
    state.listings = listings;
  },
  saveListingsError(state, err) {
    state.status = "error";
    state.error = err;
  },
  clearListings(state) {
    state.listings = [];
  },
};
const actions = {
  async autocompleteLocation({ commit }, payload) {
    try {
      commit("autocompleteRequest");
      const options = {
        method: "GET",
        url: "https://realtor.p.rapidapi.com/locations/auto-complete",
        params: { input: payload.toLowerCase() },
        headers: {
          "x-rapidapi-host": process.env.VUE_APP_RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
        },
      };

      const res = await axios.request(options);
      commit("autocompleteSuccess", res.data.autocomplete);
    } catch (err) {
      commit("autocompleteError", err.response);
    }
  },
  async searchListings(context, payload) {
    try {
      context.commit("saveListingsRequest");
      const res = await axios({
        method: "GET",
        url: "https://realtor.p.rapidapi.com/properties/v2/list-for-sale",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": process.env.VUE_APP_RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
          useQueryString: true,
        },
        params: payload,
      });
      context.commit("saveListingsSuccess", res.data.properties);
    } catch (err) {
      context.commit("saveListingsError", err.response);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
