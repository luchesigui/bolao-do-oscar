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
  <Logo class="max-w-xs mx-auto mb-20" />
  <div class="container">
    <div class="text-center mb-10">
      <h1 class="text-xl font-bold mb-2">Bolão do Oscar {{ currentYear }}</h1>
      <p>Faça seu cadastro para começar a votar</p>
    </div>

    <FormKit
      type="form"
      className="w-full"
      @submit="login"
      submit-label="Entrar"
      :actions="false"
      :config="{
        validationVisibility: 'submit',
        incompleteMessage: false,
      }"
      :classes="{
        submit: {
          'bg-blue-500': true,
        },
      }"
    >
      <FormKit
        type="email"
        name="username"
        placeholder="Username"
        validation="required|email"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'Username é obrigatório',
          email: 'Username precisa ser um e-mail',
        }"
      />

      <FormKit
        type="password"
        name="password"
        placeholder="Senha"
        validation="required"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'Senha é obrigatória',
        }"
      />

      <FormKit
        type="submit"
        label="Entrar"
        :classes="{
          outer: {
            'max-w-\[20em\]': false,
          },
          input: {
            'w-full': true,
            'justify-center': true,
          },
        }"
      />
    </FormKit>

    <hr />

    <div class="text-center mt-10">
      <p class="text-sm">
        Já tem uma conta? <router-link to="/">Entrar</router-link>
      </p>
    </div>
  </div>
</template>
