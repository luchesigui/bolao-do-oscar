import type { Category, Nominee } from '@/types';

import { supabase } from '../client';

export const categories = {
  async getAll(eventId: number) {
    const { data, error } = await supabase
      .from('event_categories')
      .select('id, winner, category(id, name)')
      .eq('event', eventId);

    if (error) {
      throw error;
    }

    return data as unknown as Category[];
  },
  async setWinner(categoryId: Category['id'], winnerId: Nominee['id']) {
    const { data, error } = await supabase
      .from('event_categories')
      .update({ winner: winnerId })
      .eq('category', categoryId);

    if (error) {
      throw error;
    }

    return data;
  },
};
