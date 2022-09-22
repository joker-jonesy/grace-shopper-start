import React, { useEffect, useState } from 'react';
import { UserCart } from './cartSlice';
import {useDispatch, useSelector} from 'react-redux'

const Cart = () => {

	const getData = useSelector(state => state.login.user);
	const getCart = getData.orders;
	const cart = getCart ? getCart.filter(item => item.isCart === true) : undefined;
	const dispatch = useDispatch();
	
	let totalPrice = 0;
	let totalQty = 0;

	const [login,setLogin]=useState({
		username: "sally12",
		password: "asdf"
	})

    useEffect(()=> {
        event.preventDefault()
        dispatch(UserCart(login))
    }, []);

	return !cart ? (
		<div>no items found</div>
	) : (
		<div className='rest'>
			<div className="temp-cart-div">
				<h1>{getName}'s cart</h1>
				<div>
					<div className='cart-item'>
						<h5>item</h5>
						<h5>qty</h5>
						<h5>price</h5>
					</div>
					<div>
						{cart[0].lineItems.map((cartItem)=>{
							totalQty += cartItem.quantity;
							totalPrice += (Number(cartItem.product.price) * cartItem.quantity)

							return (
								<div className='cart-item' key={cartItem.product.id}>
									<div className='cart-img-name'>
										<h5>{cartItem.product.name}</h5>
										<img className="cart-img" src={cartItem.product.imgCart}/>
									</div>
									<div className="qty-button">
										{/* <button onClick={removeFromQty}>-</button> */}
										<h5>{cartItem.quantity}</h5>
										{/* <button onClick={addToQty}>+</button> */}
									</div>
									<h5>${Number(cartItem.product.price) * cartItem.quantity}</h5>
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
		</div>
	);
};

export default Cart;
