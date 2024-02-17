import { supabaseProvider as provider } from "../../providers/supabase";

export const categoryService = {
  getAll: async () => {
    return provider.categories.getAll();
  },
};
