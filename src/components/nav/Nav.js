import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
	return (
		<div className="nav">
			<nav className="nav-bar">
				<Link className="nav-link" to="/cards">
					Cards
				</Link>
				<Link className="nav-link" to="/profile">
					{' '}
					Profile{' '}
				</Link>
				<Link className="nav-link" to="/cart">
					{' '}
					Cart{' '}
				</Link>
			</nav>
		</div>
	);
};

export default Nav;
