'use client';
import { useState, useEffect } from 'react';
import DrinkCard from './DrinkCard';

interface CarouselProps {
  drinks: any[];
}

const Carousel: React.FC<CarouselProps> = ({ drinks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % drinks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [drinks.length]);

  return (
    <div>
      <DrinkCard drink={drinks[currentIndex]} />
    </div>
  );
};

export default Carousel;
