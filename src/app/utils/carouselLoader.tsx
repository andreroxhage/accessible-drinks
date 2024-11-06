import fetchJson from './fetchJson';
import cache from './cache';

export default async function carouselLoader(): Promise<any[]> {
  return Promise.all(
    Array.from({ length: 10 }, () =>
      fetchJson('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    )
  ).then(drinks =>
    drinks.map(drink => {
      const d = drink.drinks[0];
      cache.set(d.idDrink, d);
      return d;
    })
  );
}
