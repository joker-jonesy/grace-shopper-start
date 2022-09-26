import React from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setLoginTotal, updateOrder } from '../cart/cartSlice';
import { getFilter } from './cardsSlice';
import Filter from './Filter';
import { fetchCards } from './cardsSlice';
const Cards = () => {
	const dispatch = useDispatch();
	const cards = useSelector((state) => state.cards.cards);
	const login = useSelector((state) => state.login);
	const filter = useSelector(getFilter);
	const [cardss, setCards] = React.useState(1);

	const handleAddToCart = (card) => {
		(login.loggedIn &&
			dispatch(
				updateOrder({ token: login.token, user: login.user, item: card })
			) &&
			dispatch(setLoginTotal)) ||
			dispatch(addToCart(card));
	};
	React.useEffect(() => {
		// if (filter !== 'All') {
		// 	cards.filter((card) => card.tag1 === filter || card.tag2 === filter);
		// } else {
		// 	fetchCards();
		// }
	}, []);
	const getTagImage = (tag) => {
		switch (tag) {
			case 'Fighter':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/Fighter_ihcidh.png';
			case 'Mage':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/Mage_mfmuxo.png';
			case 'Support':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/support_mqdozv.png';
			case 'Assassin':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/Assassin_o9vlf3.png';
			case 'Marksman':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/Marksman_gigcql.png';
			case 'Tank':
				return 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1663960623/grace-shopper/Tank_pbmlfb.png';
			default:
				return '';
		}
	};

	return !cards ? (
		<div> Loading... </div>
	) : (
		<>
			<Filter />
			<div className="all-cards-container">
				{cards.map((card, i) => (
					<div
						className="card-wrapper"
						style={{
							animationDuration: `${Math.log(i) + 1}s`,
						}}
						key={card.id}
					>
						<div className="card">
							<div>
								<Link to={`/cards/${card.id}`}>
									<img className="card-image" src={card.imgAll} alt="" />
								</Link>
							</div>{' '}
							<div className="card-title">{card.name}</div>
							<div className="card-info">
								<div className="card-container">
									{card.tag2 ? (
										<span className="tag-wrapper">
											<img className="tag" src={getTagImage(card.tag1)} />
											<img className="tag" src={getTagImage(card.tag2)} />
										</span>
									) : (
										<span className="tag-wrapper">
											<img className="tag" src={getTagImage(card.tag1)} />
										</span>
									)}
								</div>
								<div className="card-price">
									<div className="card-price">Price: ${card.price}</div>
								</div>
								<button
									className="add-to-cart-button"
									onClick={() =>
										handleAddToCart({ card: card, qty: 1, price: card.price })
									}
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Cards;
