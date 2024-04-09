import styled from 'styled-components';
import { H2 } from '../../components';

const CartContainer = ({ className }) => {
	return (
		<div className={className}>
			<H2>Корзина покупателя</H2>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	}
`;
