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
					<div className='card-display'>
						<img className="card-image" src={champion.imgSingle}></img>
						<p className="card-blurb">{champion.descriptionBlurb}</p>
					</div>
					<div className='card-tags'>
							{champion.tag2 ? (
								<div className="tag-wrapper">
									<img className="tag" src={`${champion.tag1}.png`}/>
									<img className="tag" src={`${champion.tag2}.png`}/>
								</div>
							) : (
								<div className="tag-wrapper">
									<img className="tag" src={`${champion.tag1}.png`}/>
								</div>
							)}
						</div>
					<div className="card-info">
						<div className="card-price">{champion.price}</div>
						<div className="card-quantity">{champion.qty}</div>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default SingleCard;
