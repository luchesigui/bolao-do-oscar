import { supabaseProvider as provider } from '../../providers/supabase';
import { Nominee } from '../../types';
import { Category, CategoryWithNominees } from '../../types/category.type';
import { eventService } from '../events';
import { nomineeService } from '../nominees';

export const categoryService = {
  getAll: async () => {
    const latestEventId = await eventService.getLatestEventId();
    return provider.categories.getAll(latestEventId);
  },
  async getCategorieWithNominees(
    categories: Category[],
  ): Promise<CategoryWithNominees[]> {
    const categoryIds = categories.map((category) => category.id);
    const nomineesByCategory =
      await nomineeService.getByCategories(categoryIds);

    const categoriesWithNominees = categories.map((category) => ({
      ...category,
      nominees: nomineesByCategory.get(category.id),
    }));

    return categoriesWithNominees;
  },
  async setWinner(categoryId: Category['id'], winnerId: Nominee['id']) {
    return provider.categories.setWinner(categoryId, winnerId);
  },
  getWinners(categories: Category[]) {
    const categoryWinners = new Set(
      categories.map((category) => category.winner),
    );

    return categoryWinners;
  },
};
