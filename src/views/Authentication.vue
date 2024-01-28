<script lang="ts" setup>
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { defineEmits } from "vue";

import Logo from "../components/Logo.vue";

const emit = defineEmits(["login"]);

const currentYear = new Date().getFullYear();

function login(values) {
  createUserWithEmailAndPassword(getAuth(), values.username, values.password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      emit("login");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
</script>

<template>
  <Logo class="max-w-xs mx-auto mb-24" />
  <h1 class="text-xl font-bold mb-2">Bolão do Oscar {{ currentYear }}</h1>
  <p class="mb-6">Digite seu nome e faça suas apostas</p>
  <FormKit
    type="form"
    @submit="login"
    submit-label="Entrar"
    :config="{
      validationVisibility: 'submit',
      incompleteMessage: false,
    }"
  >
    <FormKit
      class="h-10 w-9/12 px-4 mx-auto mt-5 rounded-full text-gray-900 placeholder-gray-400"
      type="email"
      name="username"
      placeholder="Username"
      validation="required|email"
      :validation-messages="{
        required: 'Username é obrigatório',
        email: 'Username precisa ser um e-mail',
      }"
    />
    <FormKit
      class="h-10 w-9/12 px-4 mx-auto mt-5 rounded-full text-gray-900 placeholder-gray-400"
      type="password"
      name="password"
      placeholder="Senha"
      validation="required"
      :validation-messages="{
        required: 'Senha é obrigatória',
      }"
    />
  </FormKit>
</template>
