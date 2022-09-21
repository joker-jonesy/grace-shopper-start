import React, { useEffect, useState } from 'react';

const Cart = () => {
	const props = [{id: 1, name: "name1", qty: 1, price: 5099}, {id: 2, name: "name2", qty: 1, price: 3099}]
	let totalPrice = 0
	let totalQty = 0

	// let totalDisplayPrice = totalPrice.toString().slice(0)
	return (
		<div className="temp-cart-div">
			<h1>Cart Items:</h1>
			<div>
				<div className='cart-item'>
					<h5>item</h5>
					<h5>qty</h5>
					<h5>price</h5>
				</div>
				<div>
					{props.map(item=> {
						const [qty, setQty] = useState(item.qty);
						function addToQty(){
							setQty(qty + 1);
						};
						function removeFromQty(){
							setQty(qty - 1);
						};
						let price = (Number(item.price) * qty ).toString().split("");
						price.splice(price.length-2, 0, ",").join("");

						totalPrice += (item.price * qty);
						totalQty += qty;

						return (
							<div className='cart-item' key={item.id}>
								<h5>{item.name}</h5>
								<div className="qty-button">
									<button onClick={removeFromQty}>-</button>
									<h5>{qty}</h5>
									<button onClick={addToQty}>+</button>
								</div>
								<h5>${price}</h5>
							</div>

						)
					})}

				</div>
			</div>
			<div className='cart-item'>
				<h5>all items</h5>
				<h5>{totalQty}</h5>
				<h5>${totalPrice}</h5>
			</div>
			<button>checkout</button>
		</div>
	);
};

export default Cart;
