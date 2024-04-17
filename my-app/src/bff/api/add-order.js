import { ORDER_STATUS } from '../constants';

export const addOrder = ({
	productsOrder,
	login,
	paymentMethod,
	deliveryMethod,
	lastChangedStstusOrderAt = {},
	noteOrder = '',
}) =>
	fetch('http://localhost:3005/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			productsOrder: productsOrder,
			client_name: login,
			payment_method: paymentMethod,
			delivery_method: deliveryMethod,
			status_order: ORDER_STATUS.CREATE,
			create_order_at: new Date(),
			last_changed_ststus_order_at: lastChangedStstusOrderAt,
			note_order: noteOrder,
		}),
	}).then((createdOrder) => createdOrder.json());
