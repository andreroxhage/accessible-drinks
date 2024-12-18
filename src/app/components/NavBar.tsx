'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Find Drinks', href: '/', current: true },
  { label: 'Explore', href: '/explore', current: false },
  { label: 'FAQ', href: '/faq', current: false },
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
      router.push(`/${encodeURIComponent(searchQuery)}`);
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
          id="top-focusable"
          className="absolute p-4 text-black bg-white m-2 sr-only focus:not-sr-only"
          tabIndex={0}
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
              id="nav"
            >
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  id={`nav_${index}`}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-medium font-medium ${
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
            {pathname !== '/' && (
              <div
                className="w-full max-w-lg lg:max-w-xs"
                role="search"
                aria-label="Site"
                id="search"
              >
                <form onSubmit={handleSubmit}>
                  <div className="w-full flex rounded-md border-0 bg-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset p-1">
                    <label htmlFor="search-input" className="sr-only">
                      Search for a drink
                    </label>
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="block w-full py-1.5 px-3 text-gray-900 rounded-md border-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-medium"
                      placeholder="Search for a drink"
                      aria-controls="search-results"
                      aria-describedby="search-description"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inset-y-0 right-0 flex items-center justify-center p-2"
                      aria-label="Search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-gray-500"
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
            )}
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
