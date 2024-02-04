import { defaultConfig, plugin } from "@formkit/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import customFormConfig from "../formkit.config";

import App from "./App.vue";
import "./index.css";
import { router } from "./router";

const app = createApp(App);
const pinia = createPinia();

app
  .use(Toast)
  .use(router)
  .use(pinia)
  .use(plugin, defaultConfig(customFormConfig));

app.mount("#app");
