import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from './cardsSlice';
const Filter = () => {
	const dispatch = useDispatch();
	const handleFilter = (event) => {
		dispatch(changeFilter(event.target.value));
	};
	return (
		<div className="filter-container">
			<select name="tag" onChange={handleFilter}>
				<option value="All" defaultValue={'All'}>
					All
				</option>
				<option value="Assassin"> Assassin </option>
				<option value="Fighter"> Fighter </option>
				<option value="Mage"> Mage </option>
				<option value="Marksman"> Marksman </option>
				<option value="Support"> Support </option>
				<option value="Tank"> Tank </option>
			</select>
		</div>
	);
};

export default Filter;
