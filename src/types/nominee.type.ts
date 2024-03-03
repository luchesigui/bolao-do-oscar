import { Category } from './category.type';
import { Movie } from './movie.type';

export type Nominee = {
  id: number;
  name: string;
  movie: Movie;
  category: Category;
};
