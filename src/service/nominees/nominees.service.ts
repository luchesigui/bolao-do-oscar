import { supabaseProvider as provider } from "../../providers/supabase";

export const nomineeService = {
  getByCategories: async (categoryIds: number[]) => {
    const nominees = await provider.nominees.getByCategories(categoryIds);
    const nomineesByCategory = provider.nominees.groupByCategory(nominees);
    return nomineesByCategory;
  },
  getByCategory: async (categoryId: number) => {
    const nominees = await provider.nominees.getByCategory(categoryId);
    return nominees;
  },
};
