import React from 'react';
import { fetchProducts } from './productsSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Cards = () => {
	const products = useSelector((state) => state.products.products);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);
	console.log(products);
	return !products ? (
		<div> Loading... </div>
	) : (
		<div>
			{products.map((product) => (
				<div key={product.id}>
					<img src={product.imgAll} alt="" />
					<Link to={`/product/${product.id}`}>
						<span>{product.name}</span>
					</Link>
					<span>
						{product.tag1}
						{product.tag2}
					</span>
				</div>
			))}
		</div>
	);
};

export default Cards;
