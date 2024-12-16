'use client';
import FAQAccordion from '@/app/components/FAQAccordion';
import Image from 'next/image';
import RecentDrinksRow from '@/app/components/RecentDrinksRow';
import { Drink } from '@/app/types';
import { useRecentDrinks } from '@/app/utils/cache';
import { useCallback, useRef } from 'react';

export default function SingleDrink({ drink }: { drink: Drink }) {
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
                    className="text-base sm:text-lg lg:text-xl/8 text-header"
                  >
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
}
