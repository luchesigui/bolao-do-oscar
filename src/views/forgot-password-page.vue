<template>
  <div class="container">
    <div class="mb-10 text-center">
      <h1 class="mb-2 text-xl font-bold">Bolão do Oscar {{ currentYear }}</h1>
      <p>Digite seu e-mail para receber um link de recuperação de senha</p>
    </div>

    <FormKit
      type="form"
      class-name="w-full"
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
      @submit="handleSubmit"
    >
      <FormKit
        type="email"
        name="email"
        placeholder="E-mail"
        validation="required|email"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'E-mail é obrigatório',
          email: 'E-mail precisa ser um e-mail válido',
        }"
      />

      <FormKit
        type="submit"
        label="Recuperar Senha"
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
  </div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';

import { authService } from '@/services';

const toast = useToast();

const currentYear = new Date().getFullYear();
const handleSubmit = async ({ email }) => {
  try {
    await authService.resetPassword(email);
    toast.success('Cheque seu e-mail para redefinir sua senha.');
  } catch (error) {
    toast.error(
      'Não foi possível atualizar sua senha. Tente novamente mais tarde.',
    );
  }
};
</script>
