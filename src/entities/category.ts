import { MovieType } from "./movie";
import { firebase as service } from "../service";

export interface Category {
  id: string;
  name: string;
  nominees: MovieType[];
  winner: string;
}

export const getCategories = (): Promise<Category[]> => {
  return service.categories.getAll();
};

export const setCategoryWinner = (category: Category, winner: Category['winner']): Promise<Category[]> => {
  return service.categories.setWinner(category, winner);
};
