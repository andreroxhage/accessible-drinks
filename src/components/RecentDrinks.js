import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

export default function RecentDrinks() {
	// Recent cocktails
	const recentValues = useSelector((state) => state.recent.value);

	return (
		<div>
			{recentValues && (
				<Container className='pt-4 mt-4 mb-4'>
					<h4>Recent drinks</h4>
					<div className='row'>
						{[...recentValues].reverse().map((drink) => (
							<div className='col-md-2' key={drink.idDrink + 'recent'}>
								<Card className='mt-4 mb-4 m-2 w-4 '>
									<Link to={'/search-results/drink/' + drink.idDrink}>
										<Card.Img
											src={drink.strDrinkThumb}
											variant='top'
										></Card.Img>
									</Link>

									<Card.Title
										className='mt-3 font-weight-bold text-left pl-2'
										style={{textAlign: 'left', paddingLeft: '10px'}}
									>
										{drink.strDrink}
									</Card.Title>
									<Card.Text
										className='mt-3'
										style={{textAlign: 'left', paddingLeft: '10px'}}
									>
										{drink.strCategory}
									</Card.Text>
								</Card>
							</div>
						))}
					</div>
				</Container>
			)}
		</div>
	);
}
