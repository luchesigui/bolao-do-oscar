import { Event } from '@/types';

import { supabaseProvider as provider } from '../../providers/supabase';

export const eventService = {
  getEvent: async (eventId: Event['id']) => {
    return provider.events.get(eventId);
  },
};
