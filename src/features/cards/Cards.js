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
				<div key={card.id} className="card">
					<div className="card-image">
						<img src={card.imgAll} alt="" />
					</div>
					<div className="all-cards-info">
						{' '}
						<Link to={`/cards/${card.id}`}>
							<div className="card-title">
								{card.name}
							</div>
						</Link>
						<div className='card-tags'>
							{card.tag2 ? (
								<div className="double-tags">
									<div className="tag-1">{card.tag1}</div>
									<div className="tag-2">{card.tag2}</div>
								</div>
							) : (
								<div className="single-tag">
									<div className="tag-1">{card.tag1}</div>
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Cards;
