import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCard } from './cardsSlice';
import { addToCart } from '../cart/cartSlice';
import { TailSpin } from 'react-loading-icons'

const SingleCard = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	React.useEffect(() => {
		dispatch(fetchSingleCard(id));
	}, []);
	const card = useSelector((state) => state.cards.singleCard);

	const handleAddToCart = (card) => {
		dispatch(addToCart(card));
	};
	console.log(card.id)
	return !card.id ? (
		<div className="all-cards-container">
            <TailSpin stroke="#f0b326" strokeWidth="3"/>
		</div>
	) : (
		<div>
			<div className="card-container">
				<div className="single-card">
					<div className='card-display'>
						<img className="single-card-image" src={card.imgSingle}></img>
						<div className='single-card-info'>
						<div className="single-card-title">{card.name}</div>
						<div className='single-view-tags'>
							{card.tag2 ? (
								<div className="tag-wrapper">
									<div className="tag">{card.tag1}</div>
									<div className="tag">{card.tag2}</div>
								</div>
							) : (
								<div className="tag-wrapper">
									<div className="tag">{card.tag1}</div>
								</div>
							)}
							</div>
							<div className='blurb-wrapper'>
								<p className="card-blurb">{card.descriptionBlurb}</p>
							</div>
							<div className='single-card-store-info'>
								<div className='single-card-price'>Price: ${card.price}</div>
								<div className="card-quantity">Qty: {card.qty}</div>
								<button className='single-add-to-cart-button' onClick={() =>
							handleAddToCart({ card: card, qty: 1, price: card.price })
						}>Add to cart</button>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default SingleCard;
