<template>
  <div v-if="user">
    <button @click="logout">Logout</button>
    <Voting />
  </div>
  <Authentication v-else @login="loadUserFromLocalStorage" />
</template>

<script lang="ts">
import Authentication from "./views/Authentication.vue";
import Voting from "./views/Voting.vue";

export default {
  name: "App",
  emits: ["login"],
  components: {
    Authentication,
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
