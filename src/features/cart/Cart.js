import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Cart = () => {
	const [qty, setQty] = useState(1);

	const cart = useSelector((state) => state.cart.cart);
	console.log(cart);
	function addToQty() {
		setQty(qty + 1);
	}
	function removeFromQty() {
		setQty(qty - 1);
	}
	return (
		<div className="cart-container">
			<h1>Cart Items:</h1>
			{!cart ? (
				<h1> EMPTY CART </h1>
			) : (
				cart.map((item) => (
					<div className="cart-item" key={item.id}>
						<div className="cart-item-img">
							<img src={item.imgCart} alt="" />
						</div>
						<div>
							<h5>{item.name}</h5>
							<h5>qty</h5>
							<h5>price</h5>
						</div>
						<div className="cart-item">
							<h5>name1</h5>
							<div>
								<div className="qty-button">
									<button onClick={removeFromQty}>-</button>
									<h5>{qty}</h5>
									<button onClick={addToQty}>+</button>
								</div>
							</div>
							<h5>$ 5,95</h5>
						</div>
					</div>
				))
			)}
			{/* <div className="cart-item">
				<h5>all items</h5>
				<h5>qty: {qty}</h5>
				<h5>$5,95</h5>
			</div> */}
			<button>checkout</button>
		</div>
	);
};

export default Cart;
