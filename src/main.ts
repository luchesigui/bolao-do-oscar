import { defaultConfig, plugin } from "@formkit/vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import customFormConfig from "../formkit.config";

import App from "./App.vue";
import "./index.css";
import Home from "./views/Home.vue";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(Toast);
app.use(router);
app.use(plugin, defaultConfig(customFormConfig));

app.mount("#app");
