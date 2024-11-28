import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main
      id="main-content"
      aria-labelledby="page-title"
      className="container mx-auto px-6 py-16 sm:py-24 lg:px-8 lg:py-32"
    >
      <div className=" grid grid-cols-1 lg:grid-cols-12 justify-between items-start gap-8 ">
        {/* Content Section - 2/3 width (8 columns) */}
        <div className="flex flex-col items-start justify-start lg:col-span-8">
          <h1
            id="page-title"
            className="text-4xl sm:text-5xl lg:text-6xl text-header font-semibold tracking-tight"
          >
            Accessibility in Every Sip
          </h1>
          <p
            id="mission-description"
            className="mt-8 text-pretty text-body text-base sm:text-lg lg:text-xl/8 font-medium max-w-3xl"
          >
            Our mission is to make every drink accessible to everyone,
            regardless of ability. Join us in raising a glass to accessibility
            and inclusion, one sip at a time.
          </p>
          <Link
            href="/explore"
            className="my-8 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Explore drinks"
          >
            Explore drinks
          </Link>
        </div>

        {/* SVG  */}
        <div className="lg:col-span-4 relative h-24 md:h-64 my-12">
          <svg
            aria-label="Accessibility Icon: Adaptive Drinking Glass"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 w-2/5 md:w-1/2 lg:w-2/5 h-auto text-secondary-pink-darker"
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
            aria-label="Accessibility Icon: Inclusive Drink Design"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 right-0 w-2/5 md:w-1/2 lg:w-2/5 h-auto text-secondary-pink-darker"
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
    </main>
  );
}
