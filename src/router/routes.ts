import Ranking from "@/views/Ranking.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Voting from "@/views/Voting.vue";
import Home from "../views/Home.vue";

export const routes = [
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/login", component: SignIn, meta: { onlySignedOut: true } },
  { path: "/cadastro", component: SignUp, meta: { onlySignedOut: true } },
  { path: "/votacao", component: Voting, meta: { requiresAuth: true } },
  { path: "/ranking", component: Ranking, meta: { requiresAuth: true } },
];
