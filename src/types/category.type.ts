import type { Nominee } from "./nominee.type";

export type Category = {
  id: number;
  name: string;
};

export type CategoryWithNominees = Category & {
  nominees: Nominee[];
};
