'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRecentDrinks } from '@/app/utils/cache';
import { useRef } from 'react';

export default function RecentDrinksRow() {
  const { recentDrinks } = useRecentDrinks();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Don't render if no recent drinks
  if (recentDrinks.length === 0) return null;

  // Handle keyboard scrolling
  const handleKeyScroll = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 200; // Adjust based on your needs

    if (e.key === 'ArrowRight') {
      container.scrollLeft += scrollAmount;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      container.scrollLeft -= scrollAmount;
      e.preventDefault();
    }
  };

  return (
    <nav aria-labelledby="recent-drinks-heading" className="container mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 id="recent-drinks-heading" className="text-lg font-semibold">
          Recently Viewed Drinks
        </h2>
      </div>

      {/* Screen reader instructions */}
      <p className="sr-only">
        Showing your {recentDrinks.length} most recently viewed drinks. Use
        arrow keys to navigate through the list.
      </p>

      <div
        ref={scrollContainerRef}
        className="relative"
        onKeyDown={handleKeyScroll}
        role="region"
        aria-label="Scrollable drinks list"
      >
        <ul
          className="grid grid-cols-4 md:grid-cols-6 gap-6 overflow-x-auto scroll-smooth"
          aria-label="Recently viewed drinks"
        >
          {recentDrinks.map((drink, index) => (
            <li
              key={drink.idDrink}
              className="flex flex-col items-center w-full p-1 gap-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 overflow-x-hidden"
            >
              <Link
                href={`/search-results/drink/${drink.idDrink}`}
                className="w-full group py-1"
                aria-labelledby={`drink-name-${drink.idDrink}`}
              >
                <div className="relative">
                  <Image
                    src={drink.strDrinkThumb}
                    alt="" // Moving descriptive text to aria-label
                    width={100}
                    height={100}
                    className="w-full rounded-lg object-cover transition-transform group-hover:scale-105 group-focus:scale-105"
                  />
                  <div className="sr-only">
                    {drink.strAlcoholic} {drink.strCategory} cocktail
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span
                    id={`drink-name-${drink.idDrink}`}
                    className="text-xs inline-block w-full"
                  >
                    {drink.strDrink}
                  </span>
                  {/* Position information for screen readers */}
                  <span className="sr-only">
                    {index + 1} of {recentDrinks.length} in recently viewed list
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Scrolling instructions for keyboard users */}
      <div
        className="mt-2 text-sm text-gray-500 text-center"
        aria-live="polite"
      >
        <span className="sr-only">
          Use Tab to move through drinks, Enter to select a drink
        </span>
      </div>
    </nav>
  );
}
