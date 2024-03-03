import { auth } from './auth';
import { categories } from './categories';
import { nominees } from './nominees';
import { votes } from './votes';

export const supabaseProvider = {
  auth,
  categories,
  nominees,
  votes,
};
