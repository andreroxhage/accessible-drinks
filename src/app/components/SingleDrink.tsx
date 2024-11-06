'use client';
import { useState, useEffect } from 'react';
import DrinkCard from './DrinkCard';
import singleDrinkLoader from '../utils/singleDrinkLoader';

interface SingleDrinkProps {
  drinkId: string;
}

const SingleDrink: React.FC<SingleDrinkProps> = ({ drinkId }) => {
  if (!drinkId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DrinkCard drink={drinkId} />
    </div>
  );
};

export default SingleDrink;
