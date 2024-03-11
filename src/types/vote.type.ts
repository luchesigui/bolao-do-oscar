import { Category } from './category.type';
import { Nominee } from './nominee.type';
import { User } from './user.type';

export type Vote = {
  id?: number;
  category: Category['id'];
  nominee: Nominee['id'];
  user: User['id'];
};

export type VoteWithUser = Vote & {
  user: User;
};

export type VoteWithInnerData = Omit<Vote, 'category' | 'nominee' | 'user'> & {
  category: Category;
  nominee: Nominee;
  user: User;
};
