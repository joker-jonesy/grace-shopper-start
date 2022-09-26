import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
	const [cardLore, setCardLore] = useState(undefined)

	const handleAddToCart = (card) => {
		dispatch(addToCart(card));
	};

	useEffect(() => {
		//needs error handeling
		if (card.id){
			console.log("heloooo")
			axios.get(`http://ddragon.leagueoflegends.com/cdn/12.18.1/data/en_US/champion/${card.name}.json`
			).then(response => {
				setCardLore(response.data.data[card.name].lore)
			})
		}
    }, [card])
	
	return !cardLore ? (
		<div className="all-cards-container">
            <TailSpin stroke="#f0b326" strokeWidth="3"/>
		</div>
	) : (
		<div>
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
								<p className="card-blurb">{cardLore}</p>
							</div>
							<div className='single-card-store-info'>
								<div className='single-card-price'>Price: ${card.price}</div>
								<div className="card-quantity">{card.qty > 5 ? "In Stock" : (card.qty === 0 ? "Out of Stock" : `Only ${card.qty} in stock`)}</div>
							</div>
							<div className='cart-button-flex'>
								<button className='single-add-to-cart-button' onClick={() =>
							handleAddToCart({ card: card, qty: 1, price: card.price })
						}>Add to cart</button>
							</div>
						</div>
					</div>
				</div>
	);
};

export default SingleCard;
