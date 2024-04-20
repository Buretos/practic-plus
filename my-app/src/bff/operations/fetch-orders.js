import { getOrders } from '../api';

export const fetchOrders = async () => {
	const orders = await getOrders();

	return {
		error: null,
		res: orders,
	};
};
