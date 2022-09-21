import React from 'react';
import Nav from './components/nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Cards from './features/cards/Cards';
import SingleCard from './features/cards/singleCard';
import Cart from './features/cart/Cart';
import Profile from './features/profile/Profile';
import Login from './features/login/Login';
import SignUp from './features/signUp/SignUp';

export default function App() {
	return (
		<div className="App">
			<div>
			<Nav />
			</div>
				<div className='rest'>
				<Routes>
					<Route index path="/cards" element={<Cards />} />
					<Route index path="/cards/:id" element={<SingleCard />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/cart" element={<Cart />} />
					<Route path = '/login' element = {<Login/>}/>
					<Route path = '/signUp' element={<SignUp/>}/>
				</Routes>
				</div>

		</div>
	);
}
