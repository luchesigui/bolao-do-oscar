<template>
  <div class="container">
    <div class="mb-10 text-center">
      <h1 class="mb-2 text-xl font-bold">Bolão do Oscar {{ currentYear }}</h1>
      <p>Esqueci minha senha</p>
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
        type="password"
        name="password"
        placeholder="Senha"
        validation="required|length:6"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'Senha é obrigatória',
          length: 'Senha precisa ter no mínimo 6 caracteres',
        }"
      />

      <FormKit
        type="password"
        name="password_confirm"
        placeholder="Confirmação de Senha"
        validation="required|length:6|confirm"
        :outer-class="{
          'max-w-[20em]': false,
        }"
        :validation-messages="{
          required: 'Senha é obrigatória',
          length: 'Senha precisa ter no mínimo 6 caracteres',
          confirm: 'As senhas precisam ser iguais',
        }"
      />

      <FormKit
        type="submit"
        label="Redefinir Senha"
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

import { router } from '@/router';
import { authService } from '@/services';

const toast = useToast();

const currentYear = new Date().getFullYear();

const handleSubmit = async ({ password }) => {
  try {
    await authService.updatePassword(password);
    toast.success('Senha atualizada com sucesso!');
    router.push('/');
  } catch {
    toast.error(
      'Não foi possível atualizar sua senha. Tente novamente mais tarde.',
    );
  }
};
</script>
