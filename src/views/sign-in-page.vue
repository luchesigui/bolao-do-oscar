<script lang="ts" setup>
import { LoginData, useUserStore } from '@/stores';

const currentYear = new Date().getFullYear();
const userStore = useUserStore();

async function login(values: LoginData) {
  try {
    await userStore.logIn(values);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="container">
    <div class="mb-10 text-center">
      <h1 class="mb-2 text-xl font-bold">Bolão do Oscar {{ currentYear }}</h1>
      <p>Faça o login para começar a votar</p>
    </div>

    <FormKit
      type="form"
      class-name="w-full"
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
      @submit="login"
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

    <hr class="mx-auto my-8 max-w-[50%]" />

    <div class="mb-4 text-center">
      <p class="text-sm">
        Não tem uma conta?
        <router-link to="/cadastro"> Cadastre-se </router-link>
      </p>
    </div>
  </div>
</template>
