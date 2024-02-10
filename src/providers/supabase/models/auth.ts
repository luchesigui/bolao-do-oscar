import { supabase } from "../client";

export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Error signing up:", error);

      return {
        user: null,
        session: null,
      };
    }

    return data;
  },
};
