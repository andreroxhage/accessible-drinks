'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search-results/${searchQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-4'>
      <input
        type="text"
        value={searchQuery}
        className="border border-black px-4 py-2"
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search for a cocktail"
      />
      <button type="submit" className="p-2 text-black border-2 border-secondary-pink-darker bg-secondary-pink rounded-md">Search</button>
    </form>
  );
};

export default SearchForm;
