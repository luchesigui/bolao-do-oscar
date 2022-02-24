import { MovieType } from "./movie";
import { firebase as service } from "../service";

export interface Categorie {
  id: string;
  name: string;
  nominees: MovieType[];
  winner: string;
}

export const getCategories = (): Promise<Categorie[]> => {
  return service.categories.getAll();
};
