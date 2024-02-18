import { supabaseProvider as provider } from "../../providers/supabase";

export const nomineeService = {
  getByCategories: async (categoryIds: number[]) => {
    const nominees = await provider.nominees.getByCategories(categoryIds);
    const nomineesByCategory = provider.nominees.groupByCategory(nominees);
    return nomineesByCategory;
  },
};
