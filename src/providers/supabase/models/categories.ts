import { Category } from "../../../types/category.type";

import { supabase } from "../client";

export const categories = {
  async getAll() {
    const { data, error } = await supabase
      .from("event_categories")
      .select("id, winner, category(id, name)")
      .eq("event", "1");

    if (error) {
      throw error;
    }

    const categories = data.map((eventCategory) => {
      const { category, ...eventCategoryProps } = eventCategory;

      return {
        ...category,
        ...eventCategoryProps,
      };
    });

    return categories as unknown as Category[];
  },
};
