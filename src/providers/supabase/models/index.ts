import { auth } from './auth';
import { categories } from './categories';
import { events } from './events';
import { nominees } from './nominees';
import { votes } from './votes';

export const supabaseProvider = {
  auth,
  categories,
  events,
  nominees,
  votes,
};
