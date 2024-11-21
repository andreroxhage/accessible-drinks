'use client';
import React, { useState, useRef, useEffect } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const headingId = `accordion-heading-${id}`;
  const contentId = `accordion-content-${id}`;

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
        ref={contentRef}
        role="region"
        aria-labelledby={headingId}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: `${contentHeight}px`,
        }}
      >
        <div className="px-4 pb-4 pt-2 text-gray-600">
          <p className="prose max-w-xl">{content}</p>
        </div>
      </div>
    </div>
  );
};

const FAQAccordion: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const faqCategories = [
    {
      category: 'Mixing Techniques',
      items: [
        {
          id: '1',
          title: 'What does it mean to shake a cocktail?',
          content:
            'Shaking is a technique used to thoroughly mix and chill cocktail ingredients. It’s especially useful for drinks containing juices, syrups, or dairy. To shake a cocktail, fill a shaker with ice and the ingredients, seal it tightly, and shake vigorously for 10-15 seconds.',
        },
        {
          id: '2',
          title: 'When should you stir a cocktail instead of shaking?',
          content:
            'Stirring is ideal for cocktails made of spirits like Martinis. Use a bar spoon to stir gently for 20-30 seconds in a mixing glass with ice to chill and dilute the drink without aeration.',
        },
        {
          id: '3',
          title: 'What is a dry shake, and why is it important?',
          content:
            'A dry shake is shaking cocktail ingredients without ice to emulsify egg whites or aquafaba for a frothy texture. After the dry shake, add ice and shake again to chill the drink.',
        },
      ],
    },
    {
      category: 'Ingredients and Preparation',
      items: [
        {
          id: '4',
          title: 'How do you muddle ingredients in a cocktail?',
          content:
            'Muddling involves gently crushing ingredients like fruits and herbs to release their flavors. Use a muddler in the bottom of a sturdy glass and press gently to avoid bitterness.',
        },
        {
          id: '5',
          title:
            'How do you balance sweet, sour, and bitter flavors in cocktails?',
          content:
            'Balancing flavors is key. A common ratio is 2 parts spirit, 1 part sweet, and 1 part sour. Adjust based on the drink and your preferences.',
        },
        {
          id: '6',
          title: 'What are bitters, and how are they used?',
          content:
            'Bitters are concentrated extracts from herbs and spices, adding depth and complexity. Use a few dashes to enhance drinks like Old Fashioneds or Manhattans.',
        },
      ],
    },
    {
      category: 'Presentation and Glassware',
      items: [
        {
          id: '7',
          title: 'How do you properly garnish a cocktail?',
          content:
            'Garnishes enhance the aroma and appearance. Use citrus peels, herbs, or spices that complement the drink’s flavors.',
        },
        {
          id: '8',
          title:
            'What are some common cocktail glass types, and when should you use them?',
          content:
            'Different drinks are served in specific glasses: Martini glasses for "up" drinks, highball glasses for long drinks, and Old Fashioned glasses for spirit-forward cocktails.',
        },
        {
          id: '9',
          title: 'How do you make a sugar or salt rim?',
          content:
            'Run a citrus wedge around the rim of the glass, then dip the rim into a plate of sugar or salt. This is common for drinks like Margaritas.',
        },
      ],
    },
    {
      category: 'Advanced Techniques',
      items: [
        {
          id: '10',
          title: 'What is layering, and how is it done?',
          content:
            'Layering creates distinct visual layers in a drink. Pour ingredients with different densities slowly over the back of a spoon.',
        },
        {
          id: '11',
          title: 'How do you create your own simple syrup?',
          content:
            'Combine equal parts sugar and water in a saucepan, heat until dissolved, and let cool. Store in a sealed container for up to a month.',
        },
      ],
    },
  ];

  return (
    <div
      className="space-y-6"
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {faqCategories.map(category => (
        <div
          key={category.category}
          className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <h2
            className="bg-gray-100 px-4 py-3 text-xl font-semibold"
            id={`category-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category.category}
          </h2>
          {category.items.map(item => (
            <AccordionItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isOpen={openSections.includes(item.id)}
              onToggle={() => toggleSection(item.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;