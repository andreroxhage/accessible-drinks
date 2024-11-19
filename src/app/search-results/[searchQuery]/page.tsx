'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import SearchResult from '@/app/components/SearchResults';
import searchLoader from '@/app/utils/searchLoader';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/20/solid';

const sortOptions = [
  { name: 'Alphabetical', key: 'strDrink', ascending: true },
  { name: 'Alcoholic First', key: 'strAlcoholic', ascending: true },
  { name: 'Category', key: 'strCategory', ascending: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SearchResultsPage({
  params,
}: {
  params: Promise<{ searchQuery: string }>;
}) {
  const { searchQuery } = use(params);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [filteredResult, setFilteredResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [filters, setFilters] = useState<
    {
      id: string;
      name: string;
      options: { value: string; label: string; checked: boolean }[];
    }[]
  >([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    category: [],
    alcoholic: [],
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchLoader(searchQuery);

        if (result.length === 0) {
          setError(`No results found for "${searchQuery}"`);
        } else if (result.length > 0) {
          setSearchResult(result);
          setFilteredResult(result);

          // Dynamically generate category and alcoholic type filters
          const categoryOptions = [
            ...new Set(result.map(drink => drink.strCategory)),
          ].map(value => ({
            value,
            label: value,
            checked: false,
          }));

          const alcoholicOptions = [
            ...new Set(result.map(drink => drink.strAlcoholic)),
          ].map(value => ({
            value,
            label: value,
            checked: false,
          }));

          setFilters([
            {
              id: 'category',
              name: 'Category',
              options: categoryOptions,
            },
            {
              id: 'alcoholic',
              name: 'Alcoholic Type',
              options: alcoholicOptions,
            },
          ]);
        }
      } catch (err) {
        setError('No results found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...searchResult];

    // Apply category filters
    if (selectedFilters.category.length > 0) {
      results = results.filter(drink =>
        selectedFilters.category.includes(drink.strCategory)
      );
    }

    // Apply alcoholic type filters
    if (selectedFilters.alcoholic.length > 0) {
      results = results.filter(drink =>
        selectedFilters.alcoholic.includes(drink.strAlcoholic)
      );
    }

    // Apply sorting with robust comparison
    results.sort((a, b) => {
      const key = selectedSort.key;
      return compareValues(a[key], b[key], selectedSort.ascending);
    });

    setFilteredResult(results);
  }, [selectedFilters, selectedSort, searchResult]);

  // Handle filter changes
  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterId] || [];
      const isChecked = currentFilters.includes(value);

      return {
        ...prev,
        [filterId]: isChecked
          ? currentFilters.filter(f => f !== value)
          : [...currentFilters, value],
      };
    });
  };

  if (loading) return <div className="h-screen"></div>;

  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 sm:py-24 lg:px-8 lg:py-32 min-h-screen"
    >
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {filteredResult.length}{' '}
          {filteredResult.length === 1 ? 'drink' : 'drinks'} found for "
          {searchQuery}"{' '}
        </h1>

        <div className="flex items-center">
          {/* Sort Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort: {selectedSort.name}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
            </div>

            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-1 ring-black/5 bg-white">
              <div className="py-1">
                {sortOptions.map(option => (
                  <MenuItem key={option.name}>
                    <button
                      onClick={() => setSelectedSort(option)}
                      className={classNames(
                        selectedSort.name === option.name
                          ? 'font-medium text-gray-900'
                          : 'text-gray-500',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      {option.name}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <form className="hidden lg:block">
            {filters.map(section => (
              <Disclosure
                key={section.id}
                as="div"
                className="border border-gray-200 py-6 bg-white hover:bg-gray-50 rounded-lg p-4 mb-4"
              >
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option.value}
                          checked={selectedFilters[section.id].includes(
                            option.value
                          )}
                          onChange={() =>
                            handleFilterChange(section.id, option.value)
                          }
                          className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={option.value}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>

          {/* Results Grid */}
          <SearchResult drinks={filteredResult} searchQuery={searchQuery} />
        </div>
      </section>
    </main>
  );
}

function compareValues(a: string, b: string, ascending = true) {
  // Handle null or undefined values
  if (a == null && b == null) return 0;
  if (a == null) return ascending ? 1 : -1;
  if (b == null) return ascending ? -1 : 1;

  // Convert to string for comparison
  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();

  // Perform comparison
  if (strA < strB) return ascending ? -1 : 1;
  if (strA > strB) return ascending ? 1 : -1;
  return 0;
}
