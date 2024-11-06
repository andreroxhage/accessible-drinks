import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar(props) {
  const [validated, setValidated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function isValid(event) {
    event.preventDefault();
    event.stopPropagation();
    if (searchQuery) {
      setValidated(false);
      navigate('/search-results/' + searchQuery);
      setSearchQuery('');
    } else {
      setValidated(true);
    }
  }

  return (
    <form noValidate validated={validated} onSubmit={isValid}>
      <div className={props.className + ' rightside-rounded'}>
        <input
          type="text"
          placeholder="Search drink..."
          aria-label="Search drink..."
          aria-describedby="basic-addon2"
          onChange={({ target: { value } }) => setSearchQuery(value)}
          value={searchQuery}
          required
        />
        <button type="submit" variant={props.variant} id="button-addon2">
          Search
        </button>
      </div>

      {props.className === 'searchbar-home' ? (
        <div type="invalid">Please search for a drink.</div>
      ) : (
        <></>
      )}
    </form>
  );
}
