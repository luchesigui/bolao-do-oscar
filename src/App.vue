<template>
  <router-view />
  <div v-if="user" class="h-full flex flex-col">
    <header class="text-center">
      <button class="text-sm mx-auto w-fit px-9 py-2" @click="logout">
        Logout
      </button>
      <Logo class="max-w-[180px] mx-auto mt-4" />
    </header>
    <main class="flex flex-1 items-center container">
      <Voting v-if="isVotingOpen" />
      <Ranking v-else />
    </main>
  </div>
  <Authentication v-else @login="loadUserFromLocalStorage" />
</template>

<script lang="ts">
import Logo from "./components/Logo.vue";
import Authentication from "./views/Authentication.vue";
import Ranking from "./views/Ranking.vue";
import Voting from "./views/Voting.vue";

export default {
  name: "App",
  emits: ["login"],
  components: {
    Authentication,
    Logo,
    Voting,
    Ranking,
  },
  data() {
    return {
      user: null,
      currentDate: new Date(),
      finishDate: new Date(2024, 3, 27, 21, 0, 0),
      updateCurrDateInterval: null,
    };
  },
  methods: {
    loadUserFromLocalStorage() {
      const user = localStorage.getItem("user");
      if (user) {
        this.user = user;
      }
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("votes");
      this.user = null;
    },
    removeInterval() {
      if (this.updateCurrDateInterval) {
        clearInterval(this.updateCurrDateInterval);
      }
    },
  },
  created() {
    this.loadUserFromLocalStorage();
  },
  computed: {
    isVotingOpen() {
      const isAdmin = this.user === "admin";
      return isAdmin || this.currentDate.getTime() < this.finishDate.getTime();
    },
  },
  mounted() {
    const finishDateTime = this.finishDate.getTime();
    const currentDateTime = this.currentDate.getTime();
    const diffBetweenDates = finishDateTime - currentDateTime;
    const minutesToVotingFinish = Math.round(
      (Math.abs(diffBetweenDates) / (1000 * 60)) % 60
    );

    if (minutesToVotingFinish > 0 && minutesToVotingFinish <= 5) {
      this.updateCurrDateInterval = setInterval(() => {
        this.currentDate = new Date();
      }, 1000 * 60);
    }
  },
  unmounted() {
    this.removeInterval();
  },
  watch: {
    isVotingOpen() {
      this.removeInterval();
    },
  },
};
</script>
