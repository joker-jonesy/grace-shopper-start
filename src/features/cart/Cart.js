import React, { useEffect, useState } from 'react';

const Cart = () => {
	const [qty, setQty] = useState(1)


	function addToQty(){
		setQty(qty + 1);
	}
	function removeFromQty(){
		setQty(qty - 1);
	}
	return (
		<div className="cart">
			<h1>Cart Items:</h1>
			<div>
				<div className='cart-item'>
					<h5>item</h5>
					<h5>qty</h5>
					<h5>price</h5>
				</div>
				<div className='cart-item'>
					<h5>name1</h5>
					<div>
						<div className='qty-div'>
							<button className="qty-button" onClick={removeFromQty}>-</button>
							<h5>{qty}</h5>
							<button className="qty-button" onClick={addToQty}>+</button>
						</div>
					</div>
					<h5>$ 5,95</h5>
				</div>
			</div>
			<div className='cart-item'>
				<h5>all items</h5>
				<h5>qty: {qty}</h5>
				<h5>$5,95</h5>
			</div>
			<button>checkout</button>
		</div>
	);
};

export default Cart;
