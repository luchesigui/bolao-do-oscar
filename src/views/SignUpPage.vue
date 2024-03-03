<script lang="ts" setup>
import { SignUpData, useUserStore } from "../stores";

const userStore = useUserStore();

const currentYear = new Date().getFullYear();

async function register(values: SignUpData) {
  try {
    await userStore.register(values);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="container">
    <div class="text-center mb-10">
      <h1 class="text-xl font-bold mb-2">
        Bolão do Oscar {{ currentYear }}
      </h1>
      <p>Faça seu cadastro para começar a votar</p>
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
      @submit="register"
    >
      <FormKit
        type="text"
        name="name"
        placeholder="Seu nome"
        validation="required"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'Nome é obrigatório',
        }"
      />
      <FormKit
        type="email"
        name="username"
        placeholder="E-mail"
        validation="required|email"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'E-mail é obrigatório',
          email: 'Este campo precisa ser um e-mail',
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

    <hr class="my-8 mx-auto max-w-[50%]">

    <div class="text-center mb-4">
      <p class="text-sm">
        Já tem uma conta? <router-link to="/">
          Entrar
        </router-link>
      </p>
    </div>
  </div>
</template>
