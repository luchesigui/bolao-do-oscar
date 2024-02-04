<template>
  <div class="h-full">
    <header class="container flex justify-between items-center py-4">
      <router-link to="/">
        <Logo class="max-w-[180px]" />
      </router-link>
      <div v-if="userStore.isSignedIn" class="flex justify-start items-center">
        <nav>
          <ul class="flex gap-4">
            <li>
              <router-link to="/">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/votacao">Votação</router-link>
            </li>
            <li>
              <router-link to="/ranking">Ranking</router-link>
            </li>
          </ul>
        </nav>
        <button
          class="text-md mx-auto w-fit px-9 py-2 lg:mx-4 lg:p-0"
          @click="userStore.signOut"
        >
          Logout
        </button>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </header>
    <main class="flex flex-col justify-center">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Logo from "./components/Logo.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>
