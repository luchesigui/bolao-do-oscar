import { supabaseProvider as provider } from '@/providers/supabase';
import { SignUpData } from '@/stores';

export const authService = {
  async signUp(signUpData: SignUpData) {
    return provider.auth.signUp(signUpData);
  },
  async signIn(email: string, password: string) {
    return provider.auth.signIn(email, password);
  },
  async signOut() {
    return provider.auth.signOut();
  },
  async updatePassword(password: string) {
    return provider.auth.updateUser({ password });
  },
  async resetPassword(email: string) {
    return provider.auth.resetPassword(email);
  },
  onAuthStateChange: provider.auth.onAuthStateChange,
};
