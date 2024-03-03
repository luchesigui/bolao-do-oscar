<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="container flex justify-between items-center mb-10 sm:mt-5"
      :class="userStore.isSignedIn ? 'flex-col sm:flex-row' : ''"
    >
      <router-link
        to="/"
        class="flex-1"
      >
        <Logo
          :class="
            userStore.isSignedIn
              ? 'max-w-[180px] my-6 sm:my-0'
              : 'sm:max-w-[180px]'
          "
        />
      </router-link>
      <div
        v-if="userStore.isSignedIn"
        class="flex justify-start items-center"
      >
        <nav>
          <ul class="flex gap-4">
            <li>
              <router-link to="/">
                Dashboard
              </router-link>
            </li>
            <li v-if="userStore.isAdmin">
              <router-link to="/ganhadores">
                Ganhadores
              </router-link>
            </li>
            <li>
              <router-link to="/votacao">
                Votação
              </router-link>
            </li>
            <li>
              <router-link to="/ranking">
                Ranking
              </router-link>
            </li>
          </ul>
        </nav>
        <button
          class="text-md w-fit ml-4"
          @click="userStore.signOut"
        >
          Logout
        </button>
      </div>
      <div
        v-else
        class="hidden sm:block"
      >
        <router-link to="/login">
          Login
        </router-link>
      </div>
    </header>
    <main
      class="flex sm:flex-1 flex-col"
      :class="userStore.isSignedIn ? 'flex-1' : 'sm:flex-1'"
    >
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Logo from "./components/OscarLogo.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>
