import { supabaseProvider as provider } from '../../providers/supabase';
import type { User } from '../../types/user.type';
import type { Vote } from '../../types/vote.type';

export const voteService = {
  registerVote: async (vote: Vote) => {
    return provider.votes.registerVote(vote);
  },
  getUserVotes: async (userId: User['id']) => {
    return provider.votes.getUserVotes(userId);
  },
  getAll: async () => {
    return provider.votes.getAll();
  },
};
