'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRecentDrinks } from '@/app/utils/cache';

export default function RecentDrinksRow() {
  const { recentDrinks } = useRecentDrinks();
  if (recentDrinks.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-2">
      <h3 className="text-lg font-semibold mb-4" id="recent-drinks-heading">
        Recently Viewed Drinks
      </h3>
      <div
        className="grid grid-cols-4 md:grid-cols-6 gap-6 overflow-x-auto"
        role="list"
        aria-labelledby="recent-drinks-heading"
      >
        {recentDrinks.map(drink => (
          <div
            key={drink.idDrink}
            className="flex flex-col items-center w-full p-1g gap-2"
            role="listitem"
          >
            <Link
              key={drink.idDrink}
              href={`/drink/${drink.idDrink}`}
              className="w-full"
              aria-label={`View details for ${drink.strDrink}`}
            >
              <Image
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                width={100}
                height={100}
                className="w-full rounded-lg object-cover"
              />
            </Link>
            <p
              className="mt-2 text-xs text-center truncate w-full"
              aria-hidden="true"
            >
              {drink.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
