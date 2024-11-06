'use client';
import { useRouter } from 'next/navigation';

interface SearchResultProps {
  drinks: any[];
}

const SearchResult: React.FC<SearchResultProps> = ({ drinks }) => {
  const router = useRouter();

  const handleDrinkClick = (id: string) => {
    router.push(`/search-results/drink/${id}`);
  };

  return (
    <div>
      {drinks.map((drink, index) => (
        <div
          key={index}
          className="text-black p-4 bg-white"
        >
          <h2 className="font-semibold text-lg">{drink.strDrink}</h2>
          <button           onClick={() => handleDrinkClick(drink.idDrink)} className="p-2 text-black border-2 border-secondary-pink-darker bg-secondary-pink rounded-md">See details</button>
          <div>
            {Object.entries(drink).map(([key, value]) => (
              // Render each key-value pair
              <p key={key}>
                <strong>{key}:</strong> {String(value) || 'N/A'}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
