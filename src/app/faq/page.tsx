import React from 'react';
import Accordion from '../components/CategoriesAccordion';
import FAQAccordion from '../components/FAQAccordion';
import BreadcrumbExplore from '../components/Breadcrumb';

export default function Categories() {
  return (
    <>
      <main
        id="main-content"
        className="container mx-auto grid grid-cols-1 lg:grid-cols-12 justify-between items-start gap-8 px-6 py-16 sm:py-24 lg:px-8 lg:py-32"
      >
        {/* Page Header Section */}
        <div className="flex flex-col items-start justify-start col-span-12 lg:col-span-8">
          {/* Page Header Section */}
          <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <h1 className="text-4xl text-header sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-8">
                Frequently Asked Questions
              </h1>

              <p className="text-xl max-w-3xl text-body">
                Find answers to common questions about cocktails, mixology, and
                the art of drink-making.
              </p>
            </div>

            <div></div>
          </div>
        </div>

        {/* Accordion Section - 1/3 width (4 columns) */}
        <div className="col-span-12 lg:col-span-4 flex justify-center items-center py-2 lg:py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-secondary-pink-darker"
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
        <div className="col-span-12">
          <FAQAccordion />
        </div>
      </main>
    </>
  );
}
