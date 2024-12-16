import { Drink } from '../types';
import { getCachedSearchResults, setCachedSearchResults } from './cache';
import fetchJson from './fetchJson';

export default async function searchLoader(query: string): Promise<Drink[]> {
  // Check cache first
  const cachedResult = getCachedSearchResults(query);
  if (cachedResult) return cachedResult;

  // Fetch from API if not in cache
  const res = await fetchJson(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
  );

  // Store in cache and return
  const drinks = res.drinks || [];
  setCachedSearchResults(query, drinks);
  return drinks;
}
