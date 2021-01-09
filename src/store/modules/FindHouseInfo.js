import axios from "axios";

const state = {
  status: null,
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
  searchPropertyRequest(state) {
    state.status = "loading";
  },
  searchPropertySuccess(state, payload) {
    state.propertyInfo = payload.data.properties[0];
    state.status = "success";
  },
  searchPropertyError(state, err) {
    state.error = err.message;
    state.status = "error";
  },
  getFavoritesRequest(state) {
    state.status = "loading";
  },
  getFavoritesSuccess(state, payload) {
    state.status = "success";
    state.favoriteListings = payload.data.favoriteListings;
  },
  getFavoritesError(state, err) {
    state.error = err.message;
    state.status = "error";
  },
  saveFavoriteRequest(state) {
    state.status = "loading";
  },
  saveFavoriteSuccess(state) {
    state.status = "success";
    state.isFavorite = true;
  },
  saveFavoriteError(state, err) {
    state.status = "error";
    state.error = err.message;
  },
  deleteFavoriteRequest(state) {
    state.status = "loading";
  },
  deleteFavoriteSuccess(state) {
    state.status = "success";
    state.isFavorite = false;
  },
  deleteFavoriteError(state, err) {
    state.status = "error";
    state.error = err.message;
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
      commit("searchPropertyRequest");
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
      commit("searchPropertyError", err);
    }
  },

  async getFavorites({ commit }) {
    try {
      commit("getFavoritesRequest");
      const res = await axios.get("/api/v1/favorite");
      commit("getFavoritesSuccess", res);
    } catch (err) {
      commit("getFavoritesError", err);
    }
  },

  async saveFavorite({ commit }, property_id) {
    try {
      commit("saveFavoriteRequest");
      const res = await axios.post("/api/v1/favorite", { property_id });
      commit("saveFavoriteSuccess", res);
    } catch (err) {
      commit("saveFavoriteError", err);
    }
  },

  async deleteFavorite({ commit }, property_id) {
    try {
      commit("deleteFavoriteRequest");
      await axios.delete("/api/v1/favorite", {
        params: {
          property_id,
        },
      });
      commit("deleteFavoriteSuccess");
    } catch (err) {
      commit("deleteFavoriteError", err);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
