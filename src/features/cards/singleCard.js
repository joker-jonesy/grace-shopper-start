import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCard } from './cardsSlice';
import { addToCart, setLoginTotal, updateOrder } from '../cart/cartSlice';
import { TailSpin } from 'react-loading-icons';
import { currencyFormat } from '../util/utils';

const SingleCard = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const login = useSelector((state) => state.login);
	React.useEffect(() => {
		dispatch(fetchSingleCard(id));
	}, []);
	const card = useSelector((state) => state.cards.singleCard);

	const handleAddToCart = (card) => {
		(login.loggedIn &&
			dispatch(
				updateOrder({ token: login.token, user: login.user, item: card })
			) &&
			dispatch(setLoginTotal)) ||
			dispatch(addToCart(card));
	};


	return (
		<div>
			<div className="card-display">
				<img className="single-card-image" src={card.imgSingle}></img>
				<div className="single-card-info">
					<div className="single-card-title">{card.name}</div>
					<div className="single-view-tags">
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
					<div className="blurb-wrapper">
						<div className="card-blurb">
							<center>Lore:</center>
							<p>{card.descriptionBlurb}</p>
						</div>
					</div>
					<div className="single-card-store-info">
						<div className="single-card-price">
							Price: ${currencyFormat(card.price)}
						</div>
						<div className="card-quantity">
							{card.qty > 5
								? 'In Stock'
								: card.qty === 0
								? 'Out of Stock'
								: `Only ${card.qty} in stock`}
						</div>
					</div>
					<div className="cart-button-flex">
						<button
							className="single-add-to-cart-button"
							onClick={() =>
								handleAddToCart({ card: card, qty: 1, price: card.price })
							}
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCard;
