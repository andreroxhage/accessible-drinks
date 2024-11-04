import React, {useEffect} from 'react';
import {useLoaderData, useParams, useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {useDispatch} from 'react-redux';
import {addRecent} from '../../utils/recentSlice';
import './SingleDrink.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/esm/Container';
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
			<Container fluid='lg' className='d-flex justify-content-center mb-4 pb-2'>
				<Card className='bigcard w-100'>
					<Row>
						<Col>
							<Card.Body>
								<Card.Title className='bigcard'>{drink.strDrink}</Card.Title>
								<Card.Text className='bigcard'>
									{drink.strInstructions}
								</Card.Text>
							</Card.Body>
							<ListGroup className='bigcard' variant='flush'>
								<ListGroup.Item>Ingredients</ListGroup.Item>

								{arr
									.filter((ingr) => ingr.length > 0)
									.map((ingr) => (
										<ListGroup.Item key={ingr}>
											{ingr}
											{}
										</ListGroup.Item>
									))}
							</ListGroup>
						</Col>

						<Col>
							<Card.Img
								src={drink.strDrinkThumb}
								className='w-100 h-100 bg-contain'
							></Card.Img>
						</Col>
					</Row>
				</Card>
			</Container>
			<RecentDrinks className='mt-4 pt-2' />
		</>
	);
}

// {drink.strAlcoholic}

// {drink.strCategory}

// {drink.strGlass}

// {drink.strInstructions}
