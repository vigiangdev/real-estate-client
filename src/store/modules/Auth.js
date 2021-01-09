import axios from "axios";
import router from "../../router";

const state = {
  token: localStorage.getItem("token") || "",
  user: null,
  status: "",
  error: null,
};

const getters = {
  isLoggedIn(state) {
    if (state.token) return true;
    return false;
  },
  authState(state) {
    return state.status;
  },
  user(state) {
    return state.user;
  },
  error(state) {
    return state.error;
  },
};

const actions = {
  async login({ commit }, user) {
    try {
      commit("authRequest");
      let res = await axios.post("/api/v1/users/login", user);

      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("authSuccess", { token: token, user: user });
      }
      return res;
    } catch (err) {
      commit("authError", err);
      return err.response;
    }
  },

  async register({ commit }, user) {
    try {
      commit("registerRequest");
      let res = await axios.post("/api/v1/users/register", user);
      if (res.data.success !== undefined) {
        commit("registerSuccess");
      }
      return res;
    } catch (err) {
      commit("registerError", err);
      return err.response;
    }
  },

  async getProfile({ commit }) {
    try {
      commit("profileRequest");
      let res = await axios.get("/api/v1/users/profile");
      commit("profileSuccess", res.data.user);
      return res;
    } catch (err) {
      commit("profileError", err);
      return err.response;
    }
  },

  async logout({ commit }) {
    await localStorage.removeItem("token");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push({ name: "Login" });
    return;
  },
};

const mutations = {
  authRequest(state) {
    state.status = "loading";
  },
  authSuccess(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
    state.status = "success";
  },
  authError(state, err) {
    state.error = err.response.data.message;
  },
  registerRequest(state) {
    state.status = "loading";
  },
  registerSuccess(state) {
    state.status = "success";
  },
  registerError(state, err) {
    state.error = err.response.data.message;
  },
  profileRequest(state) {
    state.status = "loading";
  },
  profileError(state, err) {
    state.error = err.response.data.message;
  },
  profileSuccess(state, user) {
    state.user = user;
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
