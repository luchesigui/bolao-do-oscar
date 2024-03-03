import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { SignUpData } from '../../../stores';
import { supabase } from '../client';

export type AuthChangeCallaback = (user: User) => void;

export const auth = {
  async signUp({ name, username, password }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password,
    });
    if (error || !data) {
      console.error('Error signing up:', error);

      return {
        user: null,
        session: null,
      };
    }

    await auth.saveUserName(data.user.id, name);

    return data;
  },
  async saveUserName(userId: string, name: string) {
    const { data, error } = await supabase.from('users').upsert({
      id: userId,
      name,
    });

    if (error) {
      console.error('Error saving user name:', error);
    }

    return data;
  },
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error);

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
      },
    );
  },
};
