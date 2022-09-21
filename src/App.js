import React from 'react';
import Nav from './components/nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Cards from './features/cards/Cards';
import SingleCard from './features/cards/SingleCard';
import Cart from './features/cart/Cart';
import Profile from './features/profile/Profile';
import Login from './features/login/Login';

export default function App() {
	return (
		<div className="App">
			<Nav />
			<div className="rest">
				<Routes>
					<Route index path="/cards" element={<Cards />} />
					<Route index path="/cards/:id" element={<SingleCard />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/cart" element={<Cart />} />
					<Route path = '/login'element = {<Login/>}/>
				</Routes>
			</div>
		</div>
	);
}
