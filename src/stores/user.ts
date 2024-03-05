import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import { router } from '@/router';
import { authService } from '@/services';

const toast = useToast();

export type LoginData = {
  username: string;
  password: string;
};

export type SignUpData = LoginData & {
  name: string;
};

type UserState = {
  user: User | null;
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  getters: {
    isSignedIn(state) {
      return state.user !== null;
    },
    isAdmin(state) {
      return state.user?.app_metadata.userrole === 'admin';
    },
  },
  actions: {
    async register(signUpData: SignUpData) {
      try {
        const response = await authService.signUp(signUpData);

        this.user = response.user;
        router.push('/votacao');
      } catch {
        toast.error('Não foi possível criar sua conta. Tente novamente.');
      }
    },
    async logIn({ username, password }: LoginData) {
      try {
        const response = await authService.signIn(username, password);

        this.user = response.user;
        router.push('/votacao');
      } catch {
        toast.error('Usuário ou senha inválidos');
      }
    },
    async signOut() {
      await authService.signOut();
      this.user = null;
      router.push('/login');
    },
    async getCurrentUser() {
      return new Promise((resolve) => {
        authService.onAuthStateChange((user) => {
          if (user) {
            this.user = user;
          }

          resolve(user);
        });
      });
    },
  },
});
