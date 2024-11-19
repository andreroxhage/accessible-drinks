import React from 'react';
import Accordion from './components/CategoriesAccordion';

export default function Home() {
  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className=" grid grid-cols-1 lg:grid-cols-12 justify-between items-start gap-8 ">
        {/* Content Section - 2/3 width (8 columns) */}
        <div className="flex flex-col items-start justify-start lg:col-span-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-header font-semibold tracking-tight">
            Accessibility in Every Sip
          </h1>
          <p className="mt-8 text-pretty text-body text-base sm:text-lg lg:text-xl/8 font-medium max-w-3xl">
            Our mission is to make every drink accessible to everyone,
            regardless of ability. Join us in raising a glass to accessibility
            and inclusion, one sip at a time.
          </p>
          <div className="flex flex-row items-end gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-prose h-auto text-secondary-pink-darker"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M24 28 L40 28 L38 52 L26 52 Z" />
              <rect x="28" y="22" width="8" height="6" rx="2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-prose h-auto text-secondary-pink-darker"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 28 L32 52 L48 28 Z" />
              <line x1="32" y1="52" x2="32" y2="60" />
              <line x1="24" y1="60" x2="40" y2="60" />
            </svg>
          </div>
        </div>

        {/* Accordion Section - 1/3 width (4 columns) */}
        <div className="w-full max-w-2xl lg:max-w-none lg:col-span-4">
          <Accordion />
        </div>
      </div>
    </main>
  );
}
