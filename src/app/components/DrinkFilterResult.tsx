import Link from "next/link";
import { Drink } from "../types"
import Image from "next/image";

interface DrinkFilterResultsProps {
    drinks:Drink[];
}
export const DrinkFilterResult:React.FC<DrinkFilterResultsProps> = ({ drinks }) => {
    const getAltText = (drink: Drink) => {
        const tags = drink.strTags ? ` - ${drink.strTags}` : '';
        return `${drink.strDrink} (${drink.strGlass})${tags}`;
      };
    return (<div className="col-span-3">
        {drinks.length === 0 ? (
          <div className="text-center text-lg text-body">No results</div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {drinks.map(drink => (
              <Link
                href={`/search-results/drink/${drink.idDrink}`}
                key={drink.idDrink}
                className="group relative bg-white shadow-md rounded-lg overflow-hidden focus:ring-2 focus:ring-offset-2"
                aria-label={`View details for ${drink.strDrink}`}
              >
                <div className="aspect-square w-full relative">
                  <Image 
                    alt={getAltText(drink)} 
                    src={drink.strDrinkThumb} 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                    />
                </div>
  
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-header">
                      {drink.strDrink}
                    </h3>
                  </div>
  
                  <div className="text-sm text-body">
                    <p>{drink.strCategory}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
}