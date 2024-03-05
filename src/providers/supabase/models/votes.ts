import { User, Vote, VoteWithUser } from '@/types';

import { supabase } from '../client';

export const votes = {
  async registerVote(vote: Vote) {
    const { data, error } = await supabase.from('votes').upsert({
      ...vote,
      event: 1,
    });

    if (error) {
      throw error;
    }

    return data;
  },
  async getUserVotes(userId: User['id']) {
    const { data, error } = await supabase
      .from('votes')
      .select('id, nominee, category')
      .eq('event', '1')
      .eq('user', userId);

    if (error) {
      throw error;
    }

    return data as unknown as Vote[];
  },
  async getAll() {
    const { data, error } = await supabase
      .from('votes')
      .select('id, nominee, category, user(id, name)')
      .eq('event', '1');

    if (error) {
      throw error;
    }

    return data as unknown as VoteWithUser[];
  },
};
