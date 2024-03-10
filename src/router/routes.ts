import ForgotPassword from '@/views/forgot-password-page.vue';
import Home from '@/views/home-page.vue';
import PasswordReset from '@/views/password-reset-page.vue';
import Ranking from '@/views/ranking-page.vue';
import SignIn from '@/views/sign-in-page.vue';
import SignUp from '@/views/sign-up-page.vue';
import Voting from '@/views/voting-page.vue';
import Winners from '@/views/winners-page.vue';

import { beforeEnterVoting } from '.';

export const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: SignIn, meta: { onlySignedOut: true } },
  { path: '/cadastro', component: SignUp, meta: { onlySignedOut: true } },
  {
    path: '/esqueci-minha-senha',
    component: ForgotPassword,
    meta: { onlySignedOut: true },
  },
  {
    path: '/redefinir-senha',
    component: PasswordReset,
    meta: { requiresAuth: true },
  },
  {
    path: '/votacao',
    component: Voting,
    meta: { requiresAuth: true },
    beforeEnter: beforeEnterVoting,
  },
  { path: '/ranking', component: Ranking, meta: { requiresAuth: true } },
  { path: '/ganhadores', component: Winners, meta: { adminOnly: true } },
];
