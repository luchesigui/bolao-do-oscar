import { supabaseProvider as provider } from "../../providers/supabase";
import { AuthChangeCallaback } from "../../providers/supabase/models/auth";

export const authService = {
  async signUp(email: string, password: string) {
    return provider.auth.signUp(email, password);
  },
  async signIn(email: string, password: string) {
    return provider.auth.signIn(email, password);
  },
  async signOut() {
    return provider.auth.signOut();
  },
  onAuthStateChange(callback: AuthChangeCallaback) {
    return provider.auth.onAuthStateChange(callback);
  },
};
