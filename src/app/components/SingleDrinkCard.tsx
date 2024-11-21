'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Drink } from '@/app/types';

interface SingleDrinkProps {
  drink: Drink;
}

const SingleDrinkCard: React.FC<SingleDrinkProps> = ({ drink }) => {
  const getAltText = () => {
    const tags = drink.strTags ? ` - ${drink.strTags}` : '';
    return `${drink.strDrink} (${drink.strGlass})${tags}`;
  };

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square w-full relative">
          <Image
            src={drink.strDrinkThumb}
            alt={getAltText()}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-header mb-4">
            {drink.strDrink}
          </h2>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-body">Category:</span>
              <p className="text-body">{drink.strCategory}</p>
            </div>

            <div>
              <span className="font-semibold text-body">Glass Type:</span>
              <p className="text-body">{drink.strGlass}</p>
            </div>

            <div>
              <span className="font-semibold text-body">Alcoholic:</span>
              <p className="text-body">{drink.strAlcoholic}</p>
            </div>

            {drink.strTags && (
              <div>
                <span className="font-semibold text-body">Tags:</span>
                <p className="text-body">{drink.strTags}</p>
              </div>
            )}
          </div>

          <Link
            href="/search-results"
            className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Search Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleDrinkCard;