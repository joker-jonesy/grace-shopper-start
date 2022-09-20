import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
	return (
		<nav className="navBar">
			<Link to="/cards"> Cards </Link>
			<Link to="/profile"> profile </Link>
			<Link to="/cart"> cart </Link>
		</nav>
	);
};

export default Nav;
