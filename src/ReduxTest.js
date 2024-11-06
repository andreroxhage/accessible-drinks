import { useSelector, useDispatch } from 'react-redux';
import { updateQuery, resetQuery } from './utils/querySlice';
import { setSelected, resetSelected } from './utils/selectedSlice';
import { addRecent, resetRecent } from './utils/recentSlice';
import { updateResult } from './utils/resultSlice';
import { useState } from 'react';

export default function ReduxTest() {
  // Query (search input)
  const queryValue = useSelector(state => state.query.value);
  const dispatchQuery = useDispatch();

  const [inputQuery, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleUpdate = () => {
    dispatchQuery(updateQuery(inputQuery)); // Dispatch the 'update' action with the input value
    setQuery(''); // Clear the input field after updating

    // Update result from search query
    dispatchResult(updateResult(inputQuery));
  };

  // Result
  const resultValue = useSelector(state => state.result.value);
  const dispatchResult = useDispatch();

  // Selected cocktail
  const selectedValue = useSelector(state => state.selected.value);
  const dispatchSelected = useDispatch();

  const handleSelectedChange = buttonId => {
    dispatchSelected(setSelected(buttonId));

    //Test recent selected
    dispatchRecent(addRecent(buttonId));
  };

  // Recent cocktails
  const recentValues = useSelector(state => state.recent.value);
  const dispatchRecent = useDispatch();

  return (
    <div>
      {/* Query */}
      <div className="mt-4 mb-4">
        <p>Query Value: {queryValue}</p>
        <input
          type="text"
          placeholder="Enter a new value"
          value={inputQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleUpdate}>Update Value</button>
        <button onClick={() => dispatchQuery(resetQuery())}>Reset Value</button>
      </div>

      {/* Selected cocktail */}
      <div className="mt-4 mb-4">
        <p>Selected Value: {selectedValue}</p>
        <button id="Button1" onClick={() => handleSelectedChange('Button1')}>
          Button 1
        </button>
        <button id="Button2" onClick={() => handleSelectedChange('Button2')}>
          Button 2
        </button>
        <button id="Button3" onClick={() => handleSelectedChange('Button3')}>
          Button 3
        </button>
      </div>

      {/* View recent selected items */}
      <div className="mt-4 mb-4">
        <p>Recent values</p>
        <ul>
          {recentValues.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Result */}
      <div className="mt-4 mb-4">
        <p>Result: (after calculations and fetch from database:)</p>
        <div className="border w-25">{resultValue}</div>
      </div>
    </div>
  );
}
