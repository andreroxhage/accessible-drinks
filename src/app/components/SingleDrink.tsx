'use client';
import FAQAccordion from '@/app/components/FAQAccordion';
import Image from 'next/image';
import RecentDrinksRow from '@/app/components/RecentDrinksRow';
import { Drink } from '@/app/types';
import { useRecentDrinks } from '@/app/utils/cache';
import { useCallback, useEffect, useRef } from 'react';
import Breadcrumb from './Breadcrumb';

export default function SingleDrink({ drink, searchQuery }: { drink: Drink, searchQuery?: string }) {
  // Refs for keyboard navigation
  const ingredientsRef = useRef<HTMLElement>(null);
  const instructionsRef = useRef<HTMLElement>(null);
  const characteristicsRef = useRef<HTMLElement>(null);

  const ingredients = Array.from({ length: 15 }, (_, i) => ({
    ingredient: drink[`strIngredient${i + 1}` as keyof Drink],
    measure: drink[`strMeasure${i + 1}` as keyof Drink],
  })).filter(item => item.ingredient);

  const drinkImages = [
    drink.strDrinkThumb,
    drink.strDrinkThumb.replace(/\/media\//, '/media/thumb/'),
  ];

  const { addToRecentDrinks, recentDrinks } = useRecentDrinks();
  addToRecentDrinks(drink);

  useEffect(() => {
    async function fetchGlasses() {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list'
        );
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching glasses:', error);
      }
    }

    fetchGlasses();
  }, []);

  // Keyboard navigation handlers
  const handleKeyNavigation = useCallback((e: React.KeyboardEvent) => {
    if (e.altKey) {
      switch (e.key) {
        case 'i':
          ingredientsRef.current?.focus();
          break;
        case 'p':
          instructionsRef.current?.focus();
          break;
        case 'c':
          characteristicsRef.current?.focus();
          break;
      }
    }
  }, []);

  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 sm:py-12 lg:px-8 lg:py-16 min-h-screen"
      onKeyDown={handleKeyNavigation}
    >
      {/* Skip Links */}
      <div className="skip-links">
        <a
          href="#characteristics"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-24 focus:right-6 bg-white p-4 rounded shadow"
        >
          Skip to Drink Characteristics
        </a>
        <a
          href="#ingredients"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-24 focus:right-6 bg-white p-4 rounded shadow"
        >
          Skip to Ingredients
        </a>
        <a
          href="#instructions"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-24 focus:right-6 bg-white p-4 rounded shadow"
        >
          Skip to Instructions
        </a>
      </div>

      <article className="recipe-container" aria-labelledby="recipe-title">
        {/* Header Section */}
        <header className="mb-8">
          <Breadcrumb drinkName={drink.strDrink}/>
          <h1
            id="recipe-title"
            className="text-2xl sm:text-3xl lg:text-4xl/tight text-header font-bold tracking-tight"
            tabIndex={0}
          >
            Recipe for {drink.strDrink}
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <figure className="lg:col-span-1">
            <Image
              src={drinkImages[0]}
              priority
              alt={`${drink.strDrink} cocktail`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={500}
              height={500}
              className="aspect-square w-full rounded-lg object-cover shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              tabIndex={0}
            />
          </figure>

          {/* Recipe Details Section */}
          <div className="lg:col-span-1 p-6 rounded-lg bg-white border border-secondary-pink-darker shadow-md">
            {/* Drink Characteristics */}
            <section
              aria-labelledby="characteristics-heading"
              ref={characteristicsRef}
              tabIndex={-1}
              id="characteristics"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2"
            >
              <h2
                id="characteristics-heading"
                className="text-lg font-semibold text-header mb-3"
                tabIndex={0}
              >
                Drink Characteristics
              </h2>
              <dl className="grid grid-cols-2 gap-4 mb-6">
                <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 p-2">
                  <dt className="text-xs uppercase tracking-wider text-body mb-1">
                    Category
                  </dt>
                  <dd
                    tabIndex={0}
                    className="text-base sm:text-lg lg:text-xl/8 font-medium text-header"
                  >
                    {drink.strCategory}
                  </dd>
                </div>
                <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 p-2">
                  <dt className="text-xs uppercase tracking-wider text-body mb-1">
                    Type
                  </dt>
                  <dd
                    tabIndex={0}
                    className="text-base sm:text-lg lg:text-xl/8 text-header"
                  >
                    {drink.strAlcoholic}
                  </dd>
                </div>
                <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 p-2">
                  <dt className="text-xs uppercase tracking-wider text-body mb-1">
                    Serving Glass
                  </dt>
                  <dd
                    tabIndex={0}
                    className="text-base sm:text-lg lg:text-xl/8 text-header flex flex-row gap-3"
                  >
                    {getGlassIcon(drink.strGlass)}
                    {drink.strGlass}
                  </dd>
                </div>
              </dl>
            </section>

            {/* Ingredients Section */}
            <section
              ref={ingredientsRef}
              tabIndex={-1}
              id="ingredients"
              aria-labelledby="ingredients-heading"
              className="mb-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2"
            >
              <h2
                id="ingredients-heading"
                className="text-lg font-semibold text-header mb-3 border-t pt-2"
                tabIndex={0}
              >
                Ingredients
              </h2>
              <ul className="list-disc space-y-2 pl-4" role="list">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="text-base sm:text-lg lg:text-xl/8 text-body focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 p-1"
                    tabIndex={0}
                  >
                    {item.measure ? (
                      <span>
                        <span className="font-medium">{item.measure}</span>{' '}
                        {item.ingredient}
                      </span>
                    ) : (
                      item.ingredient
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Section */}
            <section
              ref={instructionsRef}
              tabIndex={-1}
              id="instructions"
              aria-labelledby="instructions-heading"
              className="preparation-steps focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2"
            >
              <h2
                id="instructions-heading"
                className="text-lg font-semibold text-header mb-3 border-t pt-2"
                tabIndex={0}
              >
                Instructions
              </h2>
              <div className="text-base sm:text-lg lg:text-xl/8 text-body text-pretty leading-relaxed">
                {(drink.strInstructions ?? '').split('. ').map(
                  (instruction, index, array) =>
                    instruction.trim() && (
                      <p
                        key={index}
                        className="mb-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 p-1"
                        tabIndex={0}
                      >
                        {index + 1}. {instruction}
                        {!instruction.endsWith('.') ? '.' : ''}
                      </p>
                    )
                )}
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Recent Drinks Section */}
      <aside className="mt-12" aria-labelledby="recent-drinks-heading">
        <RecentDrinksRow />
      </aside>
    </main>
  );

  function getGlassIcon(strGlass: string): React.ReactNode {
    switch (strGlass.toLowerCase()) {
      case 'highball glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="highball glass"
          >
            <rect
              x="20"
              y="8"
              width="24"
              height="48"
              rx="4"
              ry="4"
              fill="#E0E0E0"
              stroke="#333"
              strokeWidth="2"
            />
            <rect
              x="22"
              y="20"
              width="20"
              height="12"
              rx="2"
              ry="2"
              fill="#A8DADC"
            />
          </svg>
        );
      case 'old-fashioned glass':
      case 'whiskey glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="old-fashioned glass"
          >
            <rect
              x="16"
              y="16"
              width="32"
              height="32"
              rx="4"
              ry="4"
              fill="#E0E0E0"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="16"
              y1="42"
              x2="48"
              y2="42"
              stroke="#A8DADC"
              strokeWidth="4"
            />
          </svg>
        );
      case 'cocktail glass':
      case 'martini glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="cocktail glass"
          >
            <polygon
              points="32,6 12,24 32,36 52,24"
              fill="#FFC1E3"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="36"
              x2="32"
              y2="54"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="56" r="2" fill="#333" />
          </svg>
        );
      case 'copper mug':
      case 'coffee mug':
      case 'irish coffee cup':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="copper mug"
          >
            <rect
              x="20"
              y="14"
              width="24"
              height="36"
              rx="4"
              ry="4"
              fill="#D97706"
              stroke="#333"
              strokeWidth="2"
            />
            <rect
              x="46"
              y="22"
              width="6"
              height="20"
              rx="3"
              ry="3"
              fill="#FFD166"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        );
      case 'collins glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="collins glass"
          >
            <rect
              x="20"
              y="8"
              width="24"
              height="48"
              rx="4"
              ry="4"
              fill="#B9E3C6"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="28" r="4" fill="#FFC857" />
          </svg>
        );
      case 'champagne flute':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="champagne flute"
          >
            <rect
              x="28"
              y="10"
              width="8"
              height="30"
              rx="2"
              ry="2"
              fill="#FFEBB8"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="40"
              x2="32"
              y2="56"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="58" r="2" fill="#333" />
          </svg>
        );
      case 'hurricane glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="hurricane glass"
          >
            <path
              d="M32,10 C24,10 20,22 24,34 C28,46 36,46 40,34 C44,22 40,10 32,10 Z"
              fill="#FFB5A7"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="46"
              x2="32"
              y2="56"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="58" r="2" fill="#333" />
          </svg>
        );
      case 'wine glass':
      case 'white wine glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="wine glass"
          >
            <path
              d="M32,12 C28,12 26,20 26,28 C26,36 28,42 32,42 C36,42 38,36 38,28 C38,20 36,12 32,12 Z"
              fill="#FFD166"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="42"
              x2="32"
              y2="56"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="58" r="2" fill="#333" />
          </svg>
        );
      case 'beer mug':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="beer mug"
          >
            <rect
              x="16"
              y="16"
              width="28"
              height="32"
              rx="4"
              ry="4"
              fill="#F9C74F"
              stroke="#333"
              strokeWidth="2"
            />
            <rect
              x="44"
              y="20"
              width="8"
              height="24"
              rx="4"
              ry="4"
              fill="#FFD166"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        );
      case 'margarita glass':
      case 'margarita/coupette glass':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="margarita glass"
          >
            <path
              d="M32,6 C24,6 20,12 22,20 C24,28 40,28 42,20 C44,12 40,6 32,6 Z"
              fill="#A8E6CF"
              stroke="#333"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="28"
              x2="32"
              y2="56"
              stroke="#333"
              strokeWidth="2"
            />
            <circle cx="32" cy="58" r="2" fill="#333" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-label="default glass"
          >
            <rect
              x="20"
              y="8"
              width="24"
              height="48"
              rx="4"
              ry="4"
              fill="#D9D9D9"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        );
    }
  }
}
