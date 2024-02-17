import { supabase } from "../client";

export const categories = {
  async getAll() {
    const { data, error } = await supabase.from("categories").select();
    if (error) {
      throw error;
    }

    return data;
  },
};
