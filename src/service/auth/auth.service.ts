import { supabaseProvider as provider } from "../../providers/supabase";

export const authService = {
  async signUp(email: string, password: string) {
    return provider.auth.signUp(email, password);
  },
};
