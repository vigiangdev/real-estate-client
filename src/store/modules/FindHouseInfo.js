import axios from "axios";

const state = {
  error: null,
  propertyInfo: null,
  isFavorite: null,
};
const getters = {
  propertyInfo(state) {
    return state.propertyInfo;
  },
  isFavorite(state) {
    return state.isFavorite;
  },
};
const mutations = {
  searchPropertySuccess(state, payload) {
    state.propertyInfo = payload.data.properties[0];
  },
  commitError(state, err) {
    state.error = err.message;
  },
  getFavoritesSuccess(state, payload) {
    state.favoriteListings = payload.data.favoriteListings;
  },
  saveFavoriteSuccess(state) {
    state.isFavorite = true;
  },
  deleteFavoriteSuccess(state) {
    state.isFavorite = false;
  },

  checkFavorite(state, property_id) {
    if (state.favoriteListings.includes(property_id)) {
      state.isFavorite = true;
    } else {
      state.isFavorite = false;
    }
  },
};
const actions = {
  async searchProperty({ commit }, payload) {
    try {
      const res = await axios({
        method: "GET",
        url: "https://realtor.p.rapidapi.com/properties/v2/detail",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": process.env.VUE_APP_RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.VUE_APP_RAPIDAPI_KEY,
          useQueryString: true,
        },
        params: {
          property_id: payload,
        },
      });
      commit("searchPropertySuccess", res);
    } catch (err) {
      commit("commitError", err);
    }
  },

  async getFavorites({ commit }) {
    try {
      const res = await axios.get("/api/v1/favorite");
      commit("getFavoritesSuccess", res);
    } catch (err) {
      commit("commitError", err);
    }
  },

  async saveFavorite({ commit }, property_id) {
    try {
      const res = await axios.post("/api/v1/favorite", { property_id });
      commit("saveFavoriteSuccess", res);
    } catch (err) {
      commit("commitError", err);
    }
  },

  async deleteFavorite({ commit }, property_id) {
    try {
      await axios.delete("/api/v1/favorite", {
        params: {
          property_id,
        },
      });
      commit("deleteFavoriteSuccess");
    } catch (err) {
      commit("commitError", err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
