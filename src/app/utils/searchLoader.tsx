import cache from './cache';
import fetchJson from './fetchJson';

export default async function searchLoader(query: string): Promise<any[]> {
  return (
    cache.get(query) ||
    fetchJson(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    ).then(res => {
      const drinks = res.drinks;
      cache.set(query, drinks);
      return drinks;
    })
  );
}
