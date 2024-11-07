'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import SearchResult from '@/app/components/SearchResults';
import searchLoader from '@/app/utils/searchLoader';

export default function SearchResultsPage({
  params,
}: {
  params: Promise<{ searchQuery: string }>;
}) {
  const { searchQuery } = use(params);

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchLoader(searchQuery);

        if (result.length === 0) {
          setError(`No results found for "${searchQuery}"`);
        } else {
          setSearchResult(result);
        }
      } catch (err) {
        setError('No results found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <SearchResult drinks={searchResult} />
    </div>
  );
}
