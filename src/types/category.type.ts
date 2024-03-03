import type { Nominee } from './nominee.type';

export type Category = {
  id: number;
  name: string;
  winner?: number;
};

export type CategoryWithNominees = Category & {
  nominees: Nominee[];
};
