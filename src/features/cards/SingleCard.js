import React from 'react';

const SingleCard = (props) => {
	return <div>
		<div className='card-container'>
			<div className='card'>
				<div className='card-title'>{props.name}</div>
				<img className='card-image'>{props.imgSingle}</img>
					{(props.tag2) ? <div className='double-tags'>
						<div className='tag-1'>{props.tag1}</div>
						<div className='tag-2'>{props.tag2}</div>
					</div>
					: <div className='single-tag'>
						<div className='tag-1'>{props.tag1}</div>
					</div>
					}
				<div className='card-info'>
					<div className='card-price'>{props.price}</div>
					<div className='card-quantity'>{props.qty}</div>
				</div>
			</div>
			<div className='card-blurb'>{props.descriptionBlurb}</div>
		</div>
	</div>;
};

export default SingleCard;
