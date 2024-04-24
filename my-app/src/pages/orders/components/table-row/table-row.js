import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-item: center;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .id-column {
		width: 70px;
	}

	& .item-column {
		width: 150px;
	}

	& .status-column {
		width: auto;
	}
`;

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
