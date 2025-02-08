import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from 'vue-router';

import { eventService } from '@/services';
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

export async function beforeEnterVoting(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const event = await eventService.getLastEvent();
  const eventHasStarted = new Date(event.starts_at) <= new Date();

  if (eventHasStarted) {
    next({ path: '/ranking' });
    return;
  }

  next();
}
