import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RecentDrinks() {
  // Recent cocktails
  const recentValues = useSelector(state => state.recent.value);

  return (
    <div>
      {recentValues && (
        <div className="pt-4 mt-4 mb-4">
          <h4>Recent drinks</h4>
          <div className="row">
            {[...recentValues].reverse().map(drink => (
              <div className="col-md-2" key={drink.idDrink + 'recent'}>
                <div className="mt-4 mb-4 m-2 w-4 ">
                  <a to={'/search-results/drink/' + drink.idDrink}>
                    <img src={drink.strDrinkThumb} variant="top"></img>
                  </a>

                  <div
                    className="mt-3 font-weight-bold text-left pl-2"
                    style={{ textAlign: 'left', paddingLeft: '10px' }}
                  >
                    {drink.strDrink}
                  </div>
                  <div
                    className="mt-3"
                    style={{ textAlign: 'left', paddingLeft: '10px' }}
                  >
                    {drink.strCategory}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
