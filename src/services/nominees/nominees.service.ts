import { supabaseProvider as provider } from '../../providers/supabase';
import { eventService } from '../events';

export const nomineeService = {
  getByCategories: async (categoryIds: number[]) => {
    const latestEventId = await eventService.getLatestEventId();
    const nominees = await provider.nominees.getByCategories(
      categoryIds,
      latestEventId,
    );
    const nomineesByCategory = provider.nominees.groupByCategory(nominees);
    return nomineesByCategory;
  },
  getByCategory: async (categoryId: number) => {
    const latestEventId = await eventService.getLatestEventId();
    const nominees = await provider.nominees.getByCategory(
      categoryId,
      latestEventId,
    );
    return nominees;
  },
};
