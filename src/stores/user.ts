import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

import { router } from '@/router';
import { authService } from '@/services';

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
      const response = await authService.signUp(signUpData);

      if (response) {
        this.user = response.user;
        router.push('/votacao');
      } else {
        throw new Error('Unable to register user');
      }
    },
    async logIn({ username, password }: LoginData) {
      const response = await authService.signIn(username, password);

      if (response) {
        this.user = response.user;
        router.push('/votacao');
      } else {
        throw new Error('login failed');
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
