import React from 'react';
import { fetchCards } from './cardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Cards = () => {
	const cards = useSelector((state) => state.cards.cards);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchCards());
	}, [dispatch]);

	return !cards ? (
		<div> Loading... </div>
	) : (
		<div className="cards-container">
			{cards.map((card) => (
				<div key={card.id} className="cards">
					<img src={card.imgAll} alt="" />;
					<Link to={`/card/${card.id}`}>
						<span>{card.name}</span>
					</Link>
					<span>
						{card.tag1}
						{card.tag2}
					</span>
				</div>
			))}
		</div>
	);
};

export default Cards;
