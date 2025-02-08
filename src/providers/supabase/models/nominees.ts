import type { Category, Nominee } from '@/types';

import { supabase } from '../client';

export const nominees = {
  async getByCategories(categoryIds: number[], eventId: number) {
    const { data, error } = await supabase
      .from('nominees')
      .select('id, name, category(id, name), movie(id, name)')
      .in('category', categoryIds)
      .eq('event', eventId);

    if (error) {
      throw error;
    }

    return data as unknown as Nominee[];
  },
  async getByCategory(categoryId: number, eventId: number) {
    const { data, error } = await supabase
      .from('nominees')
      .select('id, name, category(id, name), movie(id, name)')
      .eq('category', categoryId)
      .eq('event', eventId);

    if (error) {
      throw error;
    }

    return data as unknown as Nominee[];
  },
  groupByCategory(nominees: Nominee[]) {
    const nomineesByCategory = new Map<Category['id'], Nominee[]>();

    nominees.forEach((nominee) => {
      const nomineesByCategoryMapKey = nominee.category.id;

      if (nomineesByCategory.has(nomineesByCategoryMapKey)) {
        nomineesByCategory.get(nomineesByCategoryMapKey).push(nominee);
        return;
      }

      nomineesByCategory.set(nomineesByCategoryMapKey, [nominee]);
    });

    return nomineesByCategory;
  },
};
