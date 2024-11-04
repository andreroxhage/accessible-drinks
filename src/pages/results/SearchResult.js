import React from 'react';
import {useLoaderData, useParams, useNavigate, Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {useEffect} from 'react';
import './SearchResult.css';
import {useState} from 'react';
import SingleDrink from '../singledrink/SingleDrink';

export default function SearchResult() {
	const drinks = useLoaderData();
	const noDrinks =
		drinks === undefined || drinks === null || drinks.length === 0;
	// const [showSingleDrink, setShowSingleDrink] = useState(false);
	const {searchQuery} = useParams();
	const navigate = useNavigate();

	// todo potentially add auto navigate if only one drink however if so need to fix looping by checking history and other stuff
	// ? https://reactrouter.com/en/main/start/concepts#history-and-locations
	// useEffect(() => {
	//     const single = noDrinks ? false : drinks.length === 1;
	//     setShowSingleDrink(single);
	//     return () => {};    // do nothing on cleanup, not sure if it is needed tho
	// }, [drinks, noDrinks]);

	return (
		<>
			{/* {noDrinks ? <div className="result-text">No results</div> : showSingleDrink ? <SingleDrink drink={drinks}/> : <Results drinks={drinks} query={searchQuery}/>} */}
			{noDrinks ? (
				<div className='no-result'>
					<p className='mt-4'>No results</p>
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
		<Container className='pt-4 mt-4 mb-4'>
			<div className='result-text'>Search results: {props.query}</div>
			<div className='row'>
				{drinks.map((drink) => (
					<div className='col-12 col-md-4' key={drink.idDrink}>
						<Card className='mt-4 mb-4 m-2 w-4 '>
							<Link to={'/search-results/drink/' + drink.idDrink}>
								<Card.Img src={drink.strDrinkThumb} variant='top'></Card.Img>
							</Link>

							<Card.Title
								className='mt-3 result-text-title font-weight-bold'
								style={{textAlign: 'left', paddingLeft: '10px'}}
							>
								{drink.strDrink}
							</Card.Title>
							<Card.Text
								className='mt-3 result-text font-weight-normal '
								style={{textAlign: 'left', paddingLeft: '10px'}}
							>
								{drink.strCategory}
							</Card.Text>
						</Card>
					</div>
				))}
			</div>
		</Container>
	);
}
