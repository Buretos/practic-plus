import { setOrderStatus } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateOrderStatus = async (hash, statusId, newOrderStatusId) => {
	const accessRoles = [ROLE.SALESMAN, ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await setOrderStatus(statusId, newOrderStatusId);

	return {
		error: null,
		res: true,
	};
};
