import Home from "@/views/Home.vue";
import SignUp from "@/views/SignUp.vue";
import Voting from "@/views/Voting.vue";
import Ranking from "@/views/Ranking.vue";
import SignIn from "@/views/SignIn.vue";

export const routes = [
  { path: "/", component: SignIn },
  { path: "/cadastro", component: SignUp },
  { path: "/votacao", component: Voting },
  { path: "/ranking", component: Ranking },
];
