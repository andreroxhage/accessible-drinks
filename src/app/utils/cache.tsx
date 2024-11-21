import { Drink } from '@/app/types';
import { useEffect, useState } from 'react';

const RECENT_DRINKS_KEY = 'recentDrinks';
const SEARCH_RESULTS_CACHE_KEY = 'searchResultsCache';
const MAX_RECENT_DRINKS = 6;
const MAX_SEARCH_CACHE_SIZE = 50;

export function useRecentDrinks() {
  const [recentDrinks, setRecentDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    const storedRecentDrinks = localStorage.getItem(RECENT_DRINKS_KEY);
    setRecentDrinks(storedRecentDrinks ? JSON.parse(storedRecentDrinks) : []);
  }, []);

  const addToRecentDrinks = (drink: Drink) => {
    try {
      const currentRecentDrinks = JSON.parse(
        localStorage.getItem(RECENT_DRINKS_KEY) || '[]'
      );

      const isDuplicate = currentRecentDrinks.some(
        (d: Drink) => d.idDrink === drink.idDrink
      );

      if (isDuplicate) return;

      const updatedRecentDrinks = [drink, ...currentRecentDrinks].slice(
        0,
        MAX_RECENT_DRINKS
      );

      localStorage.setItem(
        RECENT_DRINKS_KEY,
        JSON.stringify(updatedRecentDrinks)
      );

      setRecentDrinks(updatedRecentDrinks);
    } catch (error) {
      console.error('Error adding to recent drinks:', error);
    }
  };

  const clearRecentDrinks = () => {
    try {
      localStorage.removeItem(RECENT_DRINKS_KEY);
      setRecentDrinks([]);
    } catch (error) {
      console.error('Error clearing recent drinks:', error);
    }
  };

  return { recentDrinks, addToRecentDrinks, clearRecentDrinks };
}

export function getCachedSearchResults(query: string): Drink[] | null {
  try {
    const storedCache = localStorage.getItem(SEARCH_RESULTS_CACHE_KEY);
    const searchCache: Record<string, Drink[]> = storedCache 
      ? JSON.parse(storedCache) 
      : {};

    return searchCache[query] || null;
  } catch (error) {
    console.error('Error retrieving cached search results:', error);
    return null;
  }
}

export function setCachedSearchResults(query: string, drinks: Drink[]) {
  try {
    const storedCache = localStorage.getItem(SEARCH_RESULTS_CACHE_KEY);
    const searchCache: Record<string, Drink[]> = storedCache 
      ? JSON.parse(storedCache) 
      : {};

    if (Object.keys(searchCache).length >= MAX_SEARCH_CACHE_SIZE) {
      delete searchCache[Object.keys(searchCache)[0]]; // Remove oldest entry
    }

    searchCache[query] = drinks;
    localStorage.setItem(SEARCH_RESULTS_CACHE_KEY, JSON.stringify(searchCache));
  } catch (error) {
    console.error('Error caching search results:', error);
  }
}
