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
  onAuthStateChange: provider.auth.onAuthStateChange,
};
