import { ORDER_STATUS } from '../constants';

export const addOrder = async (userId, productsInCart, paymentMethod, deliveryMethod) =>
	fetch('http://localhost:3005/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			user_id: userId,
			products_in_cart: productsInCart,
			payment_method: paymentMethod,
			delivery_method: deliveryMethod,
			status_order: ORDER_STATUS.CREATED,
			created_order_at: new Date(),
			last_changed_status_order_at: {},
			note_order: '',
		}),
	});
