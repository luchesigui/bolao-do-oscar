import { auth as authProvider } from "../../providers/supabase";

export const authService = {
  async signUp(email: string, password: string) {
    return authProvider.signUp(email, password);
  },
};
