import { User } from "@supabase/supabase-js";
import { Category } from "./category.type";
import { Nominee } from "./nominee.type";

export type Vote = {
  id?: number;
  category: Category | Category["id"];
  nominee: Nominee | Nominee["id"];
  user: User | User["id"];
};
