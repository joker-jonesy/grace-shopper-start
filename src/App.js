import React from 'react';
import Nav from './components/nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Products from './features/products/Products';
import SingleProduct from './features/products/SingleProduct';
import Cart from './features/cart/Cart';
import Profile from './features/profile/Profile';

export default function App() {
	return (
		<div className="App">
			<Nav />
			<div className="rest">
				<Routes>
					<Route index path="/products" element={<Products />} />
					<Route index path="/products/:id" element={<SingleProduct />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/cart" element={<Cart />} />
				</Routes>
			</div>
		</div>
	);
}
