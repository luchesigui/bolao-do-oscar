import { MovieType } from "./movie";
import { firebase as service } from "../service";
import { useToast } from "vue-toastification";

export interface Category {
  id: string;
  name: string;
  nominees: MovieType[];
  winner: string;
}

export const getCategories = (): Promise<Category[]> => {
  return service.categories.getAll();
};

export const setCategoryWinner = async (category: Category, winner: Category['winner']): Promise<Category[]> => {
  const updatedCategory = await service.categories.setWinner(category, winner);

  const toast = useToast();
  toast.success("Ganhador atualizado com sucesso");

  return updatedCategory
};
