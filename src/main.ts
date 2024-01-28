import { defaultConfig, plugin } from "@formkit/vue";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import customFormConfig from "../formkit.config";

import App from "./App.vue";
import "./index.css";
import { router } from "./router";

const app = createApp(App);

app.use(Toast);
app.use(router);
app.use(plugin, defaultConfig(customFormConfig));

app.mount("#app");
