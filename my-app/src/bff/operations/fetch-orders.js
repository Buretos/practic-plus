import { getOrders } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchOrders = async (hash) => {
	const accessRoles = [ROLE.SALESMAN, ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const orders = await getOrders();

	return {
		error: null,
		res: orders,
	};
};
