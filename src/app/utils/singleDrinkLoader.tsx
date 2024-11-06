import cache from './cache';
import fetchJson from './fetchJson';

export default async function singleDrinkLoader(id: string): Promise<any> {
  return (
    cache.get(id) ||
    fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then(res => {
      const drink = res.drinks && res.drinks.length > 0 ? res.drinks[0] : null;
      if (drink) {
        cache.set(id, drink);
      }
      return drink;
    })
  );
}
