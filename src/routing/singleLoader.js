import cache from './cache.js';
import fetchJson from './fetchJson.js';

export default async function singleLoader(id) {
  return (
    cache.get(id) ||
    fetchJson(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id
    ).then(res => {
      const drinks = res['drinks'][0];
      cache.set(id, drinks);
      return drinks;
    })
  );
}
