import Home from "@/views/HomePage.vue";
import Ranking from "@/views/RankingPage.vue";
import SignIn from "@/views/SignInPage.vue";
import SignUp from "@/views/SignUpPage.vue";
import Voting from "@/views/VotingPage.vue";
import Winners from "@/views/WinnersPage.vue";

export const routes = [
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/login", component: SignIn, meta: { onlySignedOut: true } },
  { path: "/cadastro", component: SignUp, meta: { onlySignedOut: true } },
  { path: "/votacao", component: Voting, meta: { requiresAuth: true } },
  { path: "/ranking", component: Ranking, meta: { requiresAuth: true } },
  { path: "/ganhadores", component: Winners, meta: { adminOnly: true } },
];
