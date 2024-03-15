import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: ${({ border = '1px solid rgb(0, 0, 0)' }) => border};
	background-color: rgb(238, 238, 238);

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		background-color: #777;
		color: #fff;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
