import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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
			navigate("/search-results/" + searchQuery);
			setSearchQuery('')
		} else {
			setValidated(true);
		}
	}



	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={isValid}
		>
			<InputGroup className={props.className + " rightside-rounded"}>
				<Form.Control
					type='text'
					placeholder='Search drink...'
					aria-label='Search drink...'
					aria-describedby='basic-addon2'
					onChange={({ target: { value } }) => setSearchQuery(value)}
					value={searchQuery}
					required
				/>
				<Button type="submit" variant={props.variant} id='button-addon2' >
					Search
				</Button>
			</InputGroup>
			
				{props.className === "searchbar-home" ?
					<Form.Control.Feedback type='invalid'>
						Please search for a drink.
					</Form.Control.Feedback>
					: <></>
				}
		</Form>
	);
}