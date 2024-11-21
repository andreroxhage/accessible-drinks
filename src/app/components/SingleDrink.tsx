'use client';

import FAQAccordion from '@/app/components/FAQAccordion';
import Image from 'next/image';
import RecentDrinksRow from '@/app/components/RecentDrinksRow';
import { Drink } from '@/app/types';
import { useRecentDrinks } from '@/app/utils/cache';

export default function SingleDrink({ drink }: { drink: Drink }) {
  // Extract ingredients and measures dynamically
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

  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 sm:py-12 lg:px-8 lg:py-16 min-h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Column - 1/3 width */}
        <div className="lg:col-span-1">
          <Image
            src={drinkImages[0]}
            priority
            alt={drink.strDrink}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={500}
            height={500}
            className="aspect-square w-full rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Drink Details Column - 2/3 width */}
        <div className="lg:col-span-1 p-6 rounded-lg bg-white border border-secondary-pink-darker shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl/tight text-header font-bold tracking-tight">
              {drink.strDrink}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-body mb-1">
                Category
              </h3>
              <p className="text-base sm:text-lg lg:text-xl/8 font-medium text-header">
                {drink.strCategory}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-body mb-1">
                Type
              </h3>
              <p className="text-base sm:text-lg lg:text-xl/8 text-header">
                {drink.strAlcoholic}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-body mb-1">
                Recommended Glass
              </h3>
              <p className="text-base sm:text-lg lg:text-xl/8 text-header">
                {drink.strGlass}
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-header mb-3 border-t pt-2">
              Ingredients
            </h3>
            <ul role="list" className="list-disc space-y-2 pl-4">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="text-base sm:text-lg lg:text-xl/8 text-body"
                >
                  {item.measure
                    ? `${item.measure} ${item.ingredient}`
                    : item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-sm font-semibold text-header mb-3 border-t pt-2">
              Instructions
            </h3>
            <p className="text-base sm:text-lg lg:text-xl/8 text-body text-pretty leading-relaxed">
              {drink.strInstructions}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RecentDrinksRow />
      </div>

      <div className="mt-12">
        <FAQAccordion />
      </div>
    </main>
  );
}
