import { useToast } from "vue-toastification";
import service from "../service/firebase";
import { MovieType } from "./movie";

export interface Category {
  id: string;
  name: string;
  nominees: MovieType[];
  winner: string;
}

export const getCategories = (): Promise<Category[]> => {
  return service.categories.getAll();
};

export const setCategoryWinner = async (
  category: Category,
  winner: Category["winner"]
): Promise<Category[]> => {
  const updatedCategory = await service.categories.setWinner(category, winner);

  const toast = useToast();
  toast.success("Ganhador atualizado com sucesso");

  return updatedCategory;
};
