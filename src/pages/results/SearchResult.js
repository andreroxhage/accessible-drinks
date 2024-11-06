import React from 'react';
import { useLoaderData, useParams, useNavigate, Link } from 'react-router-dom';

export default function SearchResult() {
  const drinks = useLoaderData();
  const noDrinks =
    drinks === undefined || drinks === null || drinks.length === 0;
  // const [showSingleDrink, setShowSingleDrink] = useState(false);
  const { searchQuery } = useParams();
  const navigate = useNavigate();

  return (
    <>
      {/* {noDrinks ? <div className="result-text">No results</div> : showSingleDrink ? <SingleDrink drink={drinks}/> : <Results drinks={drinks} query={searchQuery}/>} */}
      {noDrinks ? (
        <div className="no-result">
          <p className="mt-4">No results</p>
        </div>
      ) : (
        <Results drinks={drinks} query={searchQuery} />
      )}
    </>
  );
}

function instructionToString(string) {
  const limit = 10;
  const toLong = string.split(' ').length > limit;
  if (toLong) {
    string = string.split(' ').slice(0, limit).join(' ') + '...';
  }
  return string;
}

function Results(props) {
  const drinks = props.drinks;
  return (
    <div className="pt-4 mt-4 mb-4">
      <div className="result-text">Search results: {props.query}</div>
      <div className="row">
        {drinks.map(drink => (
          <div className="col-12 col-md-4" key={drink.idDrink}>
            <div className="mt-4 mb-4 m-2 w-4 ">
              <a to={'/search-results/drink/' + drink.idDrink}>
                <img src={drink.strDrinkThumb} variant="top" />
              </a>

              <h5
                className="mt-3 result-text-title font-weight-bold"
                style={{ textAlign: 'left', paddingLeft: '10px' }}
              >
                {drink.strDrink}
              </h5>
              <p
                className="mt-3 result-text font-weight-normal "
                style={{ textAlign: 'left', paddingLeft: '10px' }}
              >
                {drink.strCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
