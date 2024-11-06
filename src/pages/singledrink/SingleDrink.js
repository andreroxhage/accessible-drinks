import React, { useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRecent } from '../../utils/recentSlice';
import RecentDrinks from '../../components/RecentDrinks';

export default function SingleDrink(props) {
  const drink = useLoaderData();
  console.log('drink', drink);

  //console.log('drink', drink);

  const dispatchRecent = useDispatch();

  const arr = [];
  for (let n = 1; n < 16; n++) {
    let ind = 'strIngredient' + n;
    let ind2 = 'strMeasure' + n;

    arr.push(drink[ind] ? (drink[ind2] ?? '') + drink[ind] : '');
  }

  useEffect(() => {
    // Adds two of each selected since we're in server dev mode
    let add = true;
    if (add) {
      add = false;
      dispatchRecent(addRecent(drink));
    }
    return () => (add = false);
  }, []);

  return (
    <>
      <div fluid="lg" className="d-flex justify-content-center mb-4 pb-2">
        <div className="bigcard w-100">
          <div>
            <div>
              <div>
                <div className="bigcard">{drink.strDrink}</div>
                <b className="bigcard">{drink.strInstructions}</b>
              </div>
              <li className="bigcard" variant="flush">
                <b>Ingredients</b>

                {arr
                  .filter(ingr => ingr.length > 0)
                  .map(ingr => (
                    <ul key={ingr}>
                      {ingr}
                      {}
                    </ul>
                  ))}
              </li>
            </div>

            <div>
              <img
                src={drink.strDrinkThumb}
                className="w-100 h-100 bg-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <RecentDrinks className="mt-4 pt-2" />
    </>
  );
}

// {drink.strAlcoholic}

// {drink.strCategory}

// {drink.strGlass}

// {drink.strInstructions}
