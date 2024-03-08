import { Event } from '@/types';

import { supabase } from '../client';

export const events = {
  async get(eventId: Event['id']): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
};
