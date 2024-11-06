import fetchJson from './fetchJson.js';
import cache from './cache.js';

export default async function carouselLoader() {
  return Promise.all(
    Array.from(
      { length: 10 },
      _ => 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    )
      .map(url => fetchJson(url))
      .reduce((acc, curr) => acc.concat(curr), [])
  ).then(drinks =>
    drinks.map(drink => {
      const d = drink['drinks'][0];
      cache.set(d['idDrink'], d);
      return d;
    })
  );
}
