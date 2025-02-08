import { Event } from '@/types';

import { supabaseProvider as provider } from '../../providers/supabase';

export const eventService = {
  latestEventId: undefined,
  getEvent: async (eventId: Event['id']) => {
    return provider.events.get(eventId);
  },
  getLastEvent: async () => {
    const latestEvent = await provider.events.getLast();
    eventService.latestEventId = latestEvent.id;
    return latestEvent;
  },
  getLatestEventId: async () => {
    if (eventService.latestEventId) {
      return eventService.latestEventId;
    }

    const latestEvent = await provider.events.getLast();
    return latestEvent.id;
  },
};
