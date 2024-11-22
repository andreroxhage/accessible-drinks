'use client';
import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  id,
}) => {
  const headingId = `accordion-${id}`;
  const contentId = `content-${id}`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between px-4 py-4 text-left text-body hover:bg-gray-50"
          aria-expanded={isOpen}
          aria-controls={contentId}
          id={headingId}
        >
          <span className="text-lg font-medium">{title}</span>
          <ChevronDownIcon
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={`${
          isOpen ? 'block' : 'hidden'
        } px-4 pb-4 pt-2 text-gray-600`}
      >
        <p className="prose max-w-xl">{content}</p>
      </div>
    </div>
  );
};

const CategoriesAccordion: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };


  const accordionData = [
    {
      id: '1',
      title: 'Category 1: Classic Cocktails',
      content:
        'Classic cocktails are timeless drinks that have stood the test of time. These include favorites like the Martini, Manhattan, and Old Fashioned. These cocktails typically feature traditional spirits and follow time-honored preparation methods, emphasizing the quality of basic ingredients and precise mixing techniques.',
    },
    {
      id: '2',
      title: 'Category 2: Tropical Cocktails',
      content:
        'Tropical cocktails are vibrant, refreshing drinks that often feature rum, fruit juices, and exotic flavors. Popular examples include the Piña Colada, Mai Tai, and Mojito. These cocktails typically incorporate fresh fruits, coconut, and other tropical ingredients to create a vacation-in-a-glass experience.',
    },
    {
      id: '3',
      title: 'Category 3: Modern Craft Cocktails',
      content:
        'Modern craft cocktails represent contemporary innovation in mixology. These drinks often feature unique ingredient combinations, house-made syrups, and creative presentation methods. They might include molecular gastronomy techniques, unusual spirit combinations, or locally-sourced ingredients to create unique drinking experiences.',
    },
  ];

  return (
    <div
      className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm"
      role="presentation"
    >
      {accordionData.map(section => (
        <AccordionItem
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
          isOpen={openSections.includes(section.id)}
          onToggle={() => toggleSection(section.id)}
        />
      ))}
    </div>
  );
};

export default CategoriesAccordion;
