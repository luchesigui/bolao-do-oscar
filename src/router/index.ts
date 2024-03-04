import { createRouter, createWebHistory } from 'vue-router';

import { useUserStore } from '@/stores';

import { routes } from './routes';

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
    next('/login');
    return;
  }

  if (onlySignedOut && isSignedIn) {
    next('/');
    return;
  }

  next();
});

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore();
  const isAdminOnly = to.matched.some((record) => record.meta.adminOnly);
  const isAdmin =
    userStore.isAdmin ||
    ((await userStore.getCurrentUser()) && userStore.isAdmin);

  if (isAdminOnly && !isAdmin) {
    next('/');
    return;
  }

  next();
});
