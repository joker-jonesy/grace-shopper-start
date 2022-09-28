import React from 'react';
import Nav from './components/nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cards from './features/cards/Cards';
import SingleCard from './features/cards/singleCard';
import Cart from './features/cart/Cart';
import Profile from './features/profile/Profile';
import Login from './features/login/Login';
import SignUp from './features/signUp/SignUp';
import ViewOrders from './features/admin/ViewOrders';
import ViewUsers from './features/admin/ViewUsers';
import CreateCard from './features/admin/CreateCard';
import EditCard from './features/admin/EditCard';
import UpdateUser from './features/profile/UpdateUser';
import { fetchCards } from './features/cards/cardsSlice';
import Splash from './features/splash/Splash';
import PaymentRecieve from './components/PaymentRecieve';
import { checkToken } from './features/login/loginSlice';

export default function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchCards());
		dispatch(checkToken());
	}, []);

	return (
		<div className="App">
			<Nav />
			<div className="content-container">
				<Routes>
					<Route exact path="/" element={<Splash />} />
					<Route index path="/cards" element={<Cards />} />
					<Route index path="/cards/:id" element={<SingleCard />} />
					<Route exact path="/profile" element={<Profile />} />
					<Route exact path="/cart" element={<Cart />} />
					<Route path="/signUp" element={<SignUp />} />
					<Route path="/admin/viewOrders" element={<ViewOrders />} />
					<Route path="/admin/viewUsers" element={<ViewUsers />} />
					<Route path="/admin/createCard" element={<CreateCard />} />
					<Route path="/admin/editCard" element={<EditCard />} />
					<Route path="/profile/updateProfile" element={<UpdateUser />} />
					<Route path="/succeeded" element={<PaymentRecieve />} />
				</Routes>
			</div>
		</div>
	);
}
