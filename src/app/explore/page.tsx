'use client';
import { useState, useEffect, useRef } from 'react';
import { use } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';

import categories from '../categories.json';
import spirits from '../spirits.json';
import glasses from '../glass.json';
import alcoholicJSON from '../alcoholic.json';

import {
  getDrinksByCategory,
  getDrinksByIngredient,
  getDrinks,
  getDrinksByAlcoholContent,
  getDrinksByGlass,
} from '../utils/database';
import { Drink } from '../types';
import SearchResult from '../components/SearchResults';
import Breadcrumb from '../components/Breadcrumb';

interface DrinkMap {
  [id: string]: Drink;
}

export default function ExplorePage({
  params,
}: {
  params: Promise<{ searchQuery: string }>;
}) {
  const [filteredResult, setFilteredResult] = useState<any[]>([]);
  const [alcoholics, setAlcoholics] = useState<string[]>(alcoholicJSON);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<
    {
      id: string;
      name: string;
      options: { value: string; label: string; checked: boolean }[];
    }[]
  >([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({ alcoholic: alcoholicJSON, category: [], spirit: [], glass: [] });
  const searchResultsContainerRef = useRef<HTMLDivElement>(null);

  // Set focus to the search results container when it is rendered
  useEffect(() => {
    if (searchResultsContainerRef.current) {
      searchResultsContainerRef.current.tabIndex = -1;
      searchResultsContainerRef.current.focus();
    }
  }, []);
  useEffect(() => {
    // Initialize filters
    var filtersList = [
      {
        id: 'category',
        name: 'Category',
        options: categories
          .sort((a, b) => a.localeCompare(b))
          .map(value => {
            return {
              value,
              label: value,
              checked: false,
            };
          }),
      },
      {
        id: 'spirit',
        name: 'Spirit',
        options: spirits
          .sort((a, b) => a.localeCompare(b))
          .map(value => {
            return {
              value,
              label: value,
              checked: false,
            };
          }),
      },
      {
        id: 'glass',
        name: 'Glass',
        options: glasses
          .sort((a, b) => a.localeCompare(b))
          .map(value => {
            return {
              value,
              label: value,
              checked: false,
            };
          }),
      },
    ];

    setFilters(filtersList);
  }, []);

  useEffect(() => {
    const removeDuplicates = (list: Drink[]) => {
      var cleanList: Drink[] = [];
      var ids: string[] = [];
      for (var i of list) {
        if (!ids.includes(i.idDrink)) {
          cleanList.push(i);
          ids.push(i.idDrink);
        }
      }
      return cleanList;
    };

    const fetchByFilters = async () => {
      setLoading(true);

      var alcResults: Drink[] = [];
      var catResults: Drink[] = [];
      var spirResults: Drink[] = [];
      var glassResults: Drink[] = [];

      for (var option of selectedFilters['alcoholic']) {
        var data = await getDrinksByAlcoholContent(option);
        alcResults.push(...data);
      }

      if (selectedFilters['category'].length > 0) {
        for (var option of selectedFilters['category']) {
          var data = await getDrinksByCategory(option);
          var ids = data.map(i => {
            return i.idDrink;
          });
          catResults.push(...alcResults.filter(i => ids.includes(i.idDrink)));
        }
      }
      if (selectedFilters['spirit'].length > 0) {
        for (var option of selectedFilters['spirit']) {
          var data = await getDrinksByIngredient(option);
          var ids = data.map(i => {
            return i.idDrink;
          });
          spirResults.push(...alcResults.filter(i => ids.includes(i.idDrink)));
        }
      }
      if (selectedFilters['glass'].length > 0) {
        for (var option of selectedFilters['glass']) {
          var data = await getDrinksByGlass(option);
          var ids = data.map(i => {
            return i.idDrink;
          });
          glassResults.push(...alcResults.filter(i => ids.includes(i.idDrink)));
        }
      }

      var results = removeDuplicates(
        catResults.concat(spirResults.concat(glassResults))
      );
      if (results.length > 0) {
        results.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
        setFilteredResult(results);
      } else {
        setFilteredResult(alcResults);
      }
    };

    fetchByFilters();
    setLoading(false);
  }, [selectedFilters]);

  if (loading) return <div className="h-screen"></div>;

  function handleFilterChange(id: string, value: string): void {
    setSelectedFilters(prev => {
      const currentFilters = prev[id] || [];
      const isChecked = currentFilters.includes(value);
      return {
        ...prev,
        [id]: isChecked
          ? currentFilters.filter(f => f !== value)
          : [...currentFilters, value],
      };
    });
  }

  return (
    <main className="container mx-auto px-6 py-16 sm:py-12 lg:px-8 lg:py-16 min-h-screen">
      <div className="pb-6">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-header">
          Explore Drinks
        </h1>
      </div>

      <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 pt-6">
        {/* Filters */}
        <form
          className="col-span-4 lg:col-span-1"
          role="search"
          aria-label="Filter drinks"
        >
          <fieldset>
            <legend className="sr-only">Alcoholic content filters</legend>
            <Disclosure
              defaultOpen={false}
              key={alcoholics[0]}
              as="div"
              className="border border-gray-200 py-6 bg-white hover:bg-gray-50 rounded-lg p-4 mb-4"
            >
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    Alcoholic content
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
                  {alcoholics.map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        onChange={() => handleFilterChange('alcoholic', option)}
                        type="checkbox"
                        defaultChecked={true}
                        id={option}
                        value={option}
                        name="alcoholic-category"
                        className="size-4 rounded border-gray-300 text-secondary-pink-darker"
                      />
                      <label
                        className="ml-3 text-sm text-gray-600"
                        htmlFor={option}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </fieldset>

          {filters.map(section => (
            <fieldset key={section.id}>
              <legend className="sr-only">{section.name} filters</legend>
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
                          className="size-4 rounded border-gray-300 text-secondary-pink-darker"
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
            </fieldset>
          ))}
        </form>

        {/* Loading state */}
        {loading && (
          <div
            role="status"
            aria-live="assertive"
            className="col-span-4 h-screen flex items-center justify-center"
          >
            <span className="sr-only">Loading search results...</span>
            <div className="loader" aria-hidden="true"></div>
          </div>
        )}
        {/* Results Grid */}
        <div
          ref={searchResultsContainerRef}
          className="lg:col-span-3 col-span-4"
        >
          {!loading && <SearchResult drinks={filteredResult} />}
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
