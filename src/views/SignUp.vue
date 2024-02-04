<script lang="ts" setup>
import { useUserStore, type LoginData } from "../stores";

const userStore = useUserStore();

const currentYear = new Date().getFullYear();

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
        label="Cadastrar"
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

    <hr class="my-8 mx-auto max-w-[50%]" />

    <div class="text-center mb-4">
      <p class="text-sm">
        Já tem uma conta? <router-link to="/">Entrar</router-link>
      </p>
    </div>
  </div>
</template>
