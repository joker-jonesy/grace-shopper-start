import React from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import { useParams } from 'react-router-dom';

const SingleCard = () => {
	const {id} = useParams();
	const champion = useSelector(
        state => state.champions.find(champion => champion.id == id),
        shallowEqual)

	
	return <div>
		<div className='card-container'>
			<div className='card'>
				<div className='card-title'>{champion.name}</div>
				<img className='card-image'>{champion.imgSingle}</img>
					{(champion.tag2) ? <div className='double-tags'>
						<div className='tag-1'>{champion.tag1}</div>
						<div className='tag-2'>{champion.tag2}</div>
					</div>
					: <div className='single-tag'>
						<div className='tag-1'>{champion.tag1}</div>
					</div>
					}
				<div className='card-info'>
					<div className='card-price'>{champion.price}</div>
					<div className='card-quantity'>{champion.qty}</div>
				</div>
			</div>
			<div className='card-blurb'>{champion.descriptionBlurb}</div>
		</div>
	</div>
}

export default SingleCard;