import React from 'react';
import { fetchCards } from './cardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Cards = () => {
	const cards = useSelector((state) => state.cards.cards);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchCards());
	}, []);

	return !cards ? (
		<div> Loading... </div>
	) : (
		<div className="all-cards-container">
			{cards.map((card) => (
				<div key={card.id} className="all-cards">
					<div className="all-cards-img">
						<img src={card.imgAll} alt="" />
					</div>
					<div className="all-cards-info">
						{' '}
						<Link to={`/cards/${card.id}`}>
							<span>{card.name}</span>
						</Link>
						<span>
							{card.tag1}
							{card.tag2}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default Cards;
