'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
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

import categories from "../categories.json";
import spirits from "../spirits.json";
import { getDrinksByCategory, getDrinksByIngredient, getDrinks } from '../utils/database';
import { DrinkFilterResult } from '../components/DrinkFilterResult';
import { Drink } from '../types';

interface DrinkMap {
    [id:string]:Drink
}

const sortOptions = [
  { name: 'Alphabetical', key: 'strDrink', ascending: true },
  { name: 'Alcoholic First', key: 'strAlcoholic', ascending: true },
  { name: 'Category', key: 'strCategory', ascending: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ExplorePage({
  params,
}: {
  params: Promise<{ searchQuery: string }>;
}) {
  const { searchQuery } = use(params);
  const [filteredResult, setFilteredResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
    spirit:[]
  });
  useEffect(() => {
    var categoryOptions = categories.map(value => {
        return {
            value,
            label: value,
            checked: false
        }
    });

    const spiritOptions = spirits.map(value => {
        return {
            value,
            label: value,
            checked: false
        }
    });
    var filtersList = [{
        id: 'category',
        name: 'Category',
        options: categoryOptions
    }];
    filtersList.push({
        id: 'spirit',
        name: 'Spirit',
        options: spiritOptions
    });
    setFilters(filtersList);
    
  },[])
  useEffect(() => {
    
    const fetchByFilters = async () => {
        var drinkList:DrinkMap = {};
        var categoryIds:Set<string> = new Set<string>();
        for (var option of selectedFilters['category']){
            var drinks = await getDrinksByCategory(option);
            drinks.forEach(drink => {
                categoryIds.add(drink.idDrink);
                drinkList[drink.idDrink] = drink;
            })
        }

        var spiritsIds:Set<string> = new Set<string>();

        for (var option of selectedFilters['spirit']){
            var drinks = await getDrinksByIngredient(option);

            drinks.forEach(drink => {
                spiritsIds.add(drink.idDrink);
                drinkList[drink.idDrink] = drink;
            });
        }
        

        if(spiritsIds.size == 0){
            if(categoryIds.size == 0){
                var drinks:Drink[] = await getDrinks();
                setFilteredResult(drinks);
            }
            else{
                setFilteredResult(Array.from(categoryIds).map(id => {
                    return drinkList[id]
                }));
            }
        }else if(categoryIds.size == 0){
            setFilteredResult(Array.from(spiritsIds).map(id => {
                return drinkList[id];
            }));
        }else{
            setFilteredResult(Array.from(spiritsIds.intersection(categoryIds)).map(id => {
                return drinkList[id];
            }));
        }

    }   
    fetchByFilters();

  }, [selectedFilters])


  if (loading) return <div className="h-screen"></div>;

    function handleFilterChange(id: string, value: string): void {
        setSelectedFilters(prev => {
            const currentFilters = prev[id] || [];
            const isChecked = currentFilters.includes(value);
            return {
                ...prev,
                [id]: isChecked ? currentFilters.filter(f => f!==value)
                : [...currentFilters, value]
            }
        })
    }

  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 sm:py-12 lg:px-8 lg:py-16 min-h-screen"
    >
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Explore drinks!
        </h1>

        <div className="flex items-center">
          {/* Sort Dropdown */}
          
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
                          onChange={() => handleFilterChange(section.id, option.value)}
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
          <DrinkFilterResult drinks={filteredResult}/>
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
