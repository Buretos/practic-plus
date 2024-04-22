import styled from 'styled-components';
import { H2 } from '../../components';
import { useLocation } from 'react-router-dom';

const OrderContainer = ({ className }) => {
	const { state } = useLocation();
	// Проверка, есть ли состояние передано
	if (!state) {
		return <div>Заказ не найден</div>; // Рендерим что-то, если заказа нет
	}

	const {
		id,
		userLogin,
		createdOrderAt,
		deliveryMethod,
		paymentMethod,
		countAll,
		totalAmount,
		statusId,
		status,
		lastChangedStatusOrderAt,
	} = state;

	return (
		<div className={className}>
			<H2>Заказ id: {id}</H2> {/* Исправлено с userId на id */}
			<div>Покупатель: {userLogin}</div>
			{/* Остальные данные заказа можно отобразить здесь */}
		</div>
	);
};

export const Order = styled(OrderContainer)`
	margin: auto;
`;
