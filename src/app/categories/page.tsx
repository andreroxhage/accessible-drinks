import React from 'react';
import Accordion from '../components/CategoriesAccordion';

export default function Categories() {
  return (
    <>
      <main
        id="main-content"
        className="container mx-auto grid grid-cols-1 lg:grid-cols-12 justify-between items-start gap-8 px-6 py-16 sm:py-24 lg:px-8 lg:py-32"
      >
        {/* Page Header Section */}
        <div className="flex flex-col items-start justify-start  lg:col-span-8">
          {/* Page Header Section */}
          <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <h1 className="text-4xl text-header sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-8">
                Cocktail Categories
              </h1>

              <p className="text-xl max-w-3xl text-body">
                Explore our comprehensive guide to cocktail categories. Each
                section details the characteristics, popular examples, and
                unique features of different cocktail styles.
              </p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-secondary-pink-darker"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 16 L32 40 L48 16 Z" />
                <line x1="32" y1="40" x2="32" y2="56" />
                <line x1="24" y1="56" x2="40" y2="56" />
              </svg>
            </div>
          </div>
          <section aria-labelledby="intro-heading">
            <h2
              id="intro-heading"
              className="text-2xl font-semibold mb-4 text-header"
            >
              Understanding Cocktail Classifications
            </h2>
            <p className="text-body text-lg mb-8 max-w-3xl">
              Cocktails are categorized based on their preparation methods,
              primary ingredients, and historical origins. Understanding these
              categories helps in appreciating the craft and selecting drinks
              that match your preferences.
            </p>
          </section>
        </div>

        {/* Accordion Section - 1/3 width (4 columns) */}
        <div className="w-full max-w-2xl lg:max-w-none lg:col-span-4">
          <Accordion />
        </div>
      </main>
    </>
  );
}
