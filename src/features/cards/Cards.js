import React from 'react';
import { fetchCards } from './cardsSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cart/cartSlice';

const Cards = () => {
	const cards = useSelector((state) => state.cards.cards);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchCards());
	}, []);

	const handleAddToCart = (card) => {
		dispatch(addToCart(card));
	};

	return !cards ? (
		<div> Loading... </div>
	) : (
		<div className="all-cards-container">
			{cards.map((card) => (
				<div key={card.id} className="card">
					<div>
						<img className="card-image" src={card.imgAll} alt="" />
					</div>
					<div className="all-cards-info">
						{' '}
						<Link to={`/cards/${card.id}`}>
							<div className="card-title">
								{card.name}
							</div>
						</Link>
						<div className='card-info'>
							{card.tag2 ? (
								<span className="tag-wrapper">
									<img className="tag" src={`${card.tag1}.png`}/>
									<img className="tag" src={`${card.tag2}.png`}/>
								</span>
							) : (
								<span className="tag-wrapper">
									<img className="tag" src={`${card.tag1}.png`}/>
								</span>
							)}
						</div>
						<div className='card-price'>
							<span>
								<div>Price:</div>
								<div className='card-price'>${card.price}</div>
							</span>
						</div>
					</div>
					<button className='add-to-cart-button' onClick={() => handleAddToCart({productId: card.id, qty: 1})}> Add to Cart </button>
				</div>
			))}
		</div>
	);
};

export default Cards;
