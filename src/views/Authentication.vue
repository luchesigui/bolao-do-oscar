<template>
  <form
    v-on:submit.prevent="login"
    class="h-full container flex flex-col justify-center px-2 text-center -translate-y-5"
  >
    <Logo class="max-w-xs mx-auto mb-24" />
    <h1 class="text-xl font-bold mb-2">Bolão do Oscar {{ currentYear }}</h1>
    <p class="mb-6">Digite seu nome e faça suas apostas</p>
    <input
      class="h-10 w-9/12 px-4 mx-auto mt-5 rounded-full text-gray-900 placeholder-gray-400"
      type="text"
      v-model="username"
      placeholder="Nome"
    />
    <button
      type="submit"
      class="border border-white rounded-full mt-5 mx-auto w-fit px-9 py-2"
    >
      Entrar
    </button>
  </form>
</template>

<script lang="ts">
import Logo from "../components/Logo.vue";

export default {
  name: "Authentication",
  emits: ["login"],
  components: {
    Logo,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      username: "",
    };
  },
  methods: {
    login(): void {
      const userName = this.username.toLowerCase().replaceAll(" ", "-");
      if (userName) {
        localStorage.setItem("user", userName);
        this.$emit("login");
      }
    },
  },
};
</script>
