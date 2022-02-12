<template>
  <h1>Por favor, digite o nome do seu usuário</h1>
  <form v-on:submit.prevent="login">
    <input type="text" v-model="username" />
    <button type="submit">Entrar</button>
  </form>
</template>

<script lang="ts">
export default {
  name: "Authentication",
  emits: ["login"],
  data() {
    return {
      username: "",
    };
  },
  methods: {
    login() {
      const userName = this.username.toLowerCase().replaceAll(" ", "-");
      if (userName) {
        localStorage.setItem("user", userName);
        this.$emit("login");
      }
    },
  },
};
</script>
