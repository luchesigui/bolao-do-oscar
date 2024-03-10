import {
  AuthChangeEvent,
  Session,
  User,
  UserAttributes,
} from '@supabase/supabase-js';

import { SignUpData } from '@/stores';

import { supabase } from '../client';

export type AuthChangeCallback = (user: User) => void;

export const auth = {
  async signUp({ name, username, password }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password,
    });

    if (error || !data) {
      throw new Error('Error signing up');
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
      throw new Error('Error saving user name');
    }

    return data;
  },
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Error signing in');
    }

    return data;
  },
  async signOut() {
    await supabase.auth.signOut();
  },
  async updateUser(userData: UserAttributes) {
    const { data, error } = await supabase.auth.updateUser(userData);

    if (error) {
      throw new Error('Error updating user');
    }

    return data;
  },
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });

    if (error) {
      throw new Error('Error updating user');
    }

    return data;
  },
  onAuthStateChange(callback: AuthChangeCallback) {
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
