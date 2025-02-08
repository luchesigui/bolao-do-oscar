import { User, Vote, VoteWithInnerData, VoteWithUser } from '@/types';

import { supabase } from '../client';

export const votes = {
  async registerVote(vote: Vote, eventId: number) {
    const { data, error } = await supabase.from('votes').upsert({
      ...vote,
      event: eventId,
    });

    if (error) {
      throw error;
    }

    return data;
  },
  async getUserVotes(userId: User['id'], eventId: number) {
    const { data, error } = await supabase
      .from('votes')
      .select('id, nominee, category')
      .eq('event', eventId)
      .eq('user', userId)
      .returns<Vote[]>();

    if (error) {
      throw error;
    }

    return data;
  },
  async getMyVotes(userId: User['id'], eventId: number) {
    const { data, error } = await supabase
      .from('votes')
      .select('id, nominee(id, name, movie(id, name), category(id, name))')
      .eq('event', eventId)
      .eq('user', userId)
      .returns<VoteWithInnerData[]>();

    if (error) {
      throw error;
    }

    return data;
  },
  async getAll(eventId: number) {
    const { data, error } = await supabase
      .from('votes')
      .select('id, nominee, category, user(id, name)')
      .eq('event', eventId)
      .returns<VoteWithUser[]>();

    if (error) {
      throw error;
    }

    return data;
  },
};
