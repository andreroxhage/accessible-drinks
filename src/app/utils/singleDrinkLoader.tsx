import { Drink } from '../types';
import fetchJson from './fetchJson';

export default async function singleDrinkLoader(
  id: string
): Promise<Drink | null> {
  const res = await fetchJson(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  return res.drinks ? res.drinks[0] : null;
}
