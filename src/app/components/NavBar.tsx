'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/', current: true },
  { label: 'Categories', href: '/categories', current: false },
];

export default function ResponsiveHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    if (searchQuery === '') return;
    e.preventDefault();
    setIsLoading(true);
    try {
      router.push(`/search-results/${searchQuery}`);
    } catch (error) {
      console.error(error, 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrent = (href: string) => pathname === href;

  return (
    <Disclosure
      as="nav"
      className="bg-secondary-pink-lighter shadow"
      role="banner"
    >
      <div className="relative w-100 px-3 py-1">
        <a
          href="#main-content"
          className="absolute p-4 text-black bg-white m-2 sr-only focus:not-sr-only"
        >
          Skip to Main Content
        </a>
      </div>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div
              className="hidden lg:ml-6 lg:flex lg:space-x-8"
              role="navigation"
            >
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-base font-medium ${
                    isCurrent(item.href)
                      ? 'border-secondary-pink-darker text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div
              className="w-full max-w-lg lg:max-w-xs"
              role="search"
              aria-label="Site"
            >
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="relative w-full">
                  <label htmlFor="search-input" className="sr-only">
                    Search for a drink
                  </label>

                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    aria-hidden="true"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    id="search-input"
                    type="search"
                    name="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm/6"
                    placeholder="Search for a drink"
                    aria-controls="search-results"
                    aria-describedby="search-description"
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-pink-darker">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel
        transition
        className="lg:hidden origin-top transition duration-200 ease-in-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
        role="nav"
      >
        <div className="space-y-1 pb-3 pt-2">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={`block border-l-4 py-2 px-8 text-base font-medium ${
                isCurrent(item.href)
                  ? 'bg-indigo-50 border-secondary-pink-darker text-pink-darker'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
