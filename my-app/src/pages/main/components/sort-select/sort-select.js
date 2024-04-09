import React from 'react';
import styled from 'styled-components';

const SortSelectContainer = ({ className, value, onSort, options }) => {
	return (
		<div className={className}>
			<span>Сортировка </span>
			<select className="selectCategory" value={value} onChange={onSort}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export const SortSelect = styled(SortSelectContainer)`
	margin-top: 20px;

	& .selectCategory {
		margin: 20px;
		height: 40px;
		padding: 10px;
	}
`;
