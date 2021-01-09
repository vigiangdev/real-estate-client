import { createStore } from "vuex";

import Auth from "./modules/Auth";
import FindHouse from "./modules/FindHouse";
import FindHouseInfo from "./modules/FindHouseInfo";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    FindHouse,
    FindHouseInfo,
  },
});
