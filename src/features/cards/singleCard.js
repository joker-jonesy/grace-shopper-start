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
	return !champion ? (
		<h1> Loading...</h1>
	) : (
		<div>
			<div className="card-container">
				<div className="card">
					<div className="card-title">{champion.name}</div>
					<img className="card-image" src={champion.imgSingle}></img>
					{champion.tag2 ? (
						<div className="double-tags">
							<div className="tag-1">{champion.tag1}</div>
							<div className="tag-2">{champion.tag2}</div>
						</div>
					) : (
						<div className="single-tag">
							<div className="tag-1">{champion.tag1}</div>
						</div>
					)}
					<div className="card-info">
						<div className="card-price">{champion.price}</div>
						<div className="card-quantity">{champion.qty}</div>
					</div>
				</div>
				<div className="card-blurb">{champion.descriptionBlurb}</div>
			</div>
		</div>
	);
};

export default SingleCard;
