import { getOrders, getUsers } from '../api';

export const getOrdersWithClient = async (userId) => {
	const orders = await getOrders(userId);

	const users = await getUsers();

	return orders.map((order) => {
		const user = users.find(({ id }) => id === order.authorId);

		return {
			...order,
			author: user?.login,
		};
	});
};
