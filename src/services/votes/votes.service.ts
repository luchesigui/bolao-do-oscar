import { supabaseProvider as provider } from '../../providers/supabase';
import type { User } from '../../types/user.type';
import type { Vote } from '../../types/vote.type';
import { eventService } from '../events';

export const voteService = {
  registerVote: async (vote: Vote) => {
    const latestEventId = await eventService.getLatestEventId();
    return provider.votes.registerVote(vote, latestEventId);
  },
  getUserVotes: async (userId: User['id']) => {
    const latestEventId = await eventService.getLatestEventId();
    return provider.votes.getUserVotes(userId, latestEventId);
  },
  getMyVotes: async (userId: User['id']) => {
    const latestEventId = await eventService.getLatestEventId();
    return provider.votes.getMyVotes(userId, latestEventId);
  },
  getAll: async () => {
    const latestEventId = await eventService.getLatestEventId();
    return provider.votes.getAll(latestEventId);
  },
};
