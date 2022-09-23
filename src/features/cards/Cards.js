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

	const getTagImage = (tag) => {
		switch(tag){
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
	}

	return !cards ? (
		<div> Loading... </div>
	) : (
		<div className="all-cards-container">
			{cards.map((card) => (
				<div key={card.id} className="card">
					<div>
						<img className="card-image" src={card.imgAll} alt="" />
					</div>
						{' '}
						<Link to={`/cards/${card.id}`}>
							<div className="card-title">
								{card.name}
							</div>
						</Link>
						<div className='card-info'>
							<div className='card-container'>
							{card.tag2 ? (
								<span className="tag-wrapper">
									<img className="tag" src={getTagImage(card.tag1)}/>
									<img className="tag" src={getTagImage(card.tag2)}/>
								</span>
							) : (
								<span className="tag-wrapper">
									<img className="tag" src={getTagImage(card.tag1)}/>
								</span>
							)}
							</div>
						</div>
						<div className='card-price'>
							<span>
								<div className='card-price'>Price: ${card.price}</div>
							</span>
						</div>
					<button className='add-to-cart-button' onClick={() => handleAddToCart({productId: card.id, qty: 1})}> Add to Cart </button>
				</div>
			))}
		</div>
	);
};

export default Cards;
