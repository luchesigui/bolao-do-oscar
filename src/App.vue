<template>
  <header v-if="user" class="h-full flex flex-col">
    <div class="text-center">
      <button class="text-sm mx-auto w-fit px-9 py-2" @click="logout">
        Logout
      </button>
      <Logo class="max-w-[180px] mx-auto mt-4" />
    </div>
  </header>
  <main class="h-full flex flex-col justify-center">
    <router-view />
  </main>
</template>

<script setup></script>
