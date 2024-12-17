import { Drink } from '../types';
import fetchJson from './fetchJson';

export default async function singleDrinkLoader(
  id: string
): Promise<Drink | null> {
  const url =
    id === 'random'
      ? `https://www.thecocktaildb.com/api/json/v1/1/random.php`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const res = await fetchJson(url);

  return res.drinks ? res.drinks[0] : null;
}
