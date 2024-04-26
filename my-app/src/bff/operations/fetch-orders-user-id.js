import { getOrders } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchOrdersUserId = async (hash, userId) => {
	const accessRoles = [ROLE.CLIENT];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const orders = await getOrders(userId);

	return {
		error: null,
		res: orders,
	};
};
