import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueDebounce from "vue-debounce";

import "./assets/css/reset.css";
import "./assets/css/style.css";

createApp(App)
  .use(store)
  .use(router)
  .use(vueDebounce)
  .mount("#app");
