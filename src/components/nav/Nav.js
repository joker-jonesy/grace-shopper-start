import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
	return (
		<nav className="nav-bar">
				<Link className="nav-link" to="/cards"> Cards </Link>
				<Link className="nav-link" to="/profile"> profile </Link>
				<Link className="nav-link" to="/cart"> cart </Link>
		</nav>
	);
};

export default Nav;
