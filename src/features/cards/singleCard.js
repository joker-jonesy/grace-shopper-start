import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCard } from './cardsSlice';

const SingleCard = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	React.useEffect(() => {
		dispatch(fetchSingleCard(id));
	}, []);
	const champion = useSelector((state) => state.cards.singleCard);

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

	return !champion ? (
		<h1> Loading...</h1>
	) : (
		<div>
			<div className="card-container">
				<div className="card">
					<div className='card-display'>
						<img className="card-image" src={champion.imgSingle}></img>
						<div className='single-card-info'>
						<div className="single-card-title">{champion.name}</div>
						<div className='single-view-tags'>
							{champion.tag2 ? (
								<div className="tag-wrapper">
									<div className="tag">{champion.tag1}</div>
									<div className="tag">{champion.tag2}</div>
								</div>
							) : (
								<div className="tag-wrapper">
									<div className="tag">{champion.tag1}</div>
								</div>
							)}
							</div>
							<p className="card-blurb">{champion.descriptionBlurb}</p>
							<div className='single-card-price'>Price: ${champion.price}</div>
							<div className="card-quantity">Qty: {champion.qty}</div>
							<button className='single-add-to-cart-button'>Add to cart</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default SingleCard;
