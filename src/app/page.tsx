'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import singleDrinkLoader from './utils/singleDrinkLoader';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    if (searchQuery.trim() === '') return;
    e.preventDefault();
    setIsLoading(true);
    try {
      router.push(`/${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error(error, 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomDrink = async () => {
    setIsLoading(true);
    try {
      const randomDrink = await singleDrinkLoader('random???');
      if (randomDrink) {
        router.push(`/${randomDrink.strDrink}/${randomDrink.idDrink}`);
      }
    } catch (error) {
      console.error('Error fetching random drink', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main
      aria-labelledby="page-title"
      className="container mx-auto px-6 py-16 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className=" grid grid-cols-1 lg:grid-cols-12 justify-between items-start gap-8 ">
        {/* Content Section - 2/3 width (8 columns) */}
        <div className="flex flex-col items-start justify-start lg:col-span-8">
          <h1
            id="page-title"
            className="text-3xl sm:text-4xl lg:text-5xl text-header font-semibold tracking-tight align-middle"
          >
            Accessible Cocktails
          </h1>
        </div>

        {/* Search Container */}
        <div
          className="w-full max-w-2xl"
          role="search"
          aria-label="Cocktail Search"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center rounded-full border border-gray-300 bg-white shadow-md focus-within:ring-2 focus-within:ring-primary-pink-darker">
              <label htmlFor="homepage-search" className="sr-only">
                Search for a drink
              </label>
              <input
                id="main-content"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for a cocktail..."
                className="w-full py-3 px-6 text-lg rounded-full border-none focus:outline-none"
                aria-controls="search-results"
                aria-describedby="search-description"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-pink-darker text-gray-500 hover:bg-primary-pink transition-colors"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3a7.5 7.5 0 105.904 12.258l4.348 4.349a.75.75 0 001.06-1.061l-4.348-4.348A7.5 7.5 0 0010.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section: Optional Navigation or Additional Content */}
      <footer className="mt-12 text-center z-10 relative">
        <nav aria-label="Quick Links" className="flex justify-center gap-12">
          <Link
            href="/explore"
            className="text-body hover:text-primary-pink-darker transition-colors"
            aria-label="Explore drinks by ingredients or categories"
          >
            Explore Drinks
          </Link>
          <Link
            href="/faq"
            className="text-body hover:text-primary-pink-darker transition-colors"
            aria-label="Frequently Asked Questions"
          >
            FAQ
          </Link>
          <Link
            onClick={handleRandomDrink}
            href={`/random???`}
            className="text-body hover:text-primary-pink-darker transition-colors"
            aria-label="Get a random drink suggestion"
          >
            Random Drink
          </Link>
        </nav>
      </footer>
    </main>
  );
}
