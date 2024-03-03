import Home from '@/views/home-page.vue';
import Ranking from '@/views/ranking-page.vue';
import SignIn from '@/views/sign-in-page.vue';
import SignUp from '@/views/sign-up-page.vue';
import Voting from '@/views/voting-page.vue';
import Winners from '@/views/winners-page.vue';

export const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: SignIn, meta: { onlySignedOut: true } },
  { path: '/cadastro', component: SignUp, meta: { onlySignedOut: true } },
  { path: '/votacao', component: Voting, meta: { requiresAuth: true } },
  { path: '/ranking', component: Ranking, meta: { requiresAuth: true } },
  { path: '/ganhadores', component: Winners, meta: { adminOnly: true } },
];
