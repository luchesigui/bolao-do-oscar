import { supabaseProvider as provider } from "../../providers/supabase";
import { Category, CategoryWithNominees } from "../../types/category.type";
import { nomineeService } from "../nominees";

export const categoryService = {
  getAll: async () => {
    return provider.categories.getAll();
  },
  async getCategorieWithNominees(
    categories: Category[]
  ): Promise<CategoryWithNominees[]> {
    const categoryIds = categories.map((category) => category.id);
    const nomineesByCategory = await nomineeService.getByCategories(
      categoryIds
    );

    const categoriesWithNominees = categories.map((category) => ({
      ...category,
      nominees: nomineesByCategory.get(category.id),
    }));

    return categoriesWithNominees;
  },
};
