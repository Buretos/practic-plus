import React from 'react';

export const SortSelect = ({ value, onSort, options }) => {
	return (
		<div>
			<span>Сортировка </span>
			<select value={value} onChange={onSort}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
