import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "../stores/user";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const onlySignedOut = to.matched.some((record) => record.meta.onlySignedOut);
  const isSignedIn = userStore.isSignedIn || (await userStore.getCurrentUser());

  if (requiresAuth && !isSignedIn) {
    next("/login");
    return;
  }

  if (onlySignedOut && isSignedIn) {
    next("/");
    return;
  }

  next();
});
