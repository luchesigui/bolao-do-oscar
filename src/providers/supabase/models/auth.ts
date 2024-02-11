import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { supabase } from "../client";

export type AuthChangeCallaback = (user: User) => void;

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
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);

      return {
        user: null,
        session: null,
      };
    }

    return data;
  },
  async signOut() {
    await supabase.auth.signOut();
  },
  onAuthStateChange(callback: AuthChangeCallaback) {
    return supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session) => {
        if (session) {
          callback(session.user);
          return;
        }

        callback(null);
      }
    );
  },
};
