import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueDebounce from "vue-debounce";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronCircleLeft, faChevronCircleRight);

import "./assets/css/reset.css";
import "./assets/css/style.css";

createApp(App)
  .use(store)
  .use(router)
  .use(vueDebounce)
  .mount("#app");
