'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Drink } from '@/app/types';

interface SearchResultProps {
  drinks: Drink[];
  searchQuery?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ drinks, searchQuery }) => {
  const getAltText = (drink: Drink) => {
    const tags = drink.strTags ? ` - ${drink.strTags}` : '';
    return `${drink.strDrink} (${drink.strGlass})${tags}`;
  };

  const getCardDescription = (drink: Drink) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof Drink];
      if (ingredient) ingredients.push(ingredient);
    }
    return `is served in a ${drink.strGlass}. It is ${drink.strAlcoholic ? 'an alcoholic' : 'a non-alcoholic'} beverage. Ingredients: ${ingredients.join(', ')}.`;
  };

  return (
    <div
      role="grid"
      aria-label={
        searchQuery
          ? `Search results for ${searchQuery}`
          : 'Drink search results'
      }
    >
      {drinks.length === 0 ? (
        <div className="text-center text-lg text-body"></div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {drinks.map((drink, index) => (
            <div key={index}>
              <Link
                href={`/search-results/drink/${drink.idDrink}`}
                key={drink.idDrink}
                className="group relative bg-white shadow-md rounded-lg overflow-hidden focus:ring-2 focus:ring-offset-2"
                aria-labelledby={`drink-title-${drink.idDrink} drink-description-${drink.idDrink}`}
              >
                <div className="aspect-square w-full relative">
                  <Image
                    src={drink.strDrinkThumb}
                    alt={getAltText(drink)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    priority={index < 4}
                    className="object-cover transition shadow-md group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3
                      id={`drink-title-${drink.idDrink}`}
                      className="text-lg font-semibold text-header mb-2"
                    >
                      {drink.strDrink}
                    </h3>
                  </div>

                  <div
                    id={`drink-description-${drink.idDrink}`}
                    className="text-sm text-body"
                  >
                    <span className="sr-only">{getCardDescription(drink)}</span>
                    <p aria-hidden="true">{drink.strCategory}</p>
                    {drink.strAlcoholic && (
                      <p aria-hidden="true">{drink.strAlcoholic}</p>
                    )}
                  </div>
                </div>
              </Link>

              {(index + 1) % 4 === 0 && (
                <div className="w-full col-span-full">
                  <a
                    href="#nav_0"
                    onClick={e => {
                      const navElement = document.querySelector('#nav_0');
                      if (navElement && navElement.firstElementChild) {
                        (navElement.firstElementChild as HTMLElement).focus();
                      }
                    }}
                    className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-24 focus:right-6 bg-white p-4 rounded shadow"
                  >
                    Skip to navigation
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
