import React from 'react';
import Nav from './components/nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Cards from './components/cards/Cards';
import SingleCard from './components/cards/SingleCard';
import Cart from './components/cart/Cart';
import Profile from './components/profile/Profile';

export default function App() {
	return (
		<div className="App">
			<Nav />
			<div className='rest'>
				<Routes>
					<Route index path="/cards" element={<Cards />} />
					<Route index path="/cards/:id" element={<SingleCard />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/cart" element={<Cart />} />
				</Routes>
			</div>
		</div>
	);
}
