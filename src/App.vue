<template>
  <div v-if="user" class="h-full flex flex-col">
    <header class="text-center">
      <button class="text-sm mx-auto w-fit px-9 py-2" @click="logout">
        Logout
      </button>
      <Logo class="max-w-[180px] mx-auto mt-4" />
    </header>
    <main class="flex flex-1 items-center container">
      <Voting />
    </main>
  </div>
  <Authentication v-else @login="loadUserFromLocalStorage" />
</template>

<script lang="ts">
import Authentication from "./views/Authentication.vue";
import Logo from "./components/Logo.vue";
import Voting from "./views/Voting.vue";

export default {
  name: "App",
  emits: ["login"],
  components: {
    Authentication,
    Logo,
    Voting,
  },
  data() {
    return {
      user: null,
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
      this.user = null;
    },
  },
  created() {
    this.loadUserFromLocalStorage();
  },
};
</script>

<style></style>
