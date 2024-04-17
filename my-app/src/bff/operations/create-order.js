import { addOrder } from '../api'; // Идём к запросу (обращению) в db...
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const createOrder = async (hash, newOrderData) => {
	const accessRoles = [ROLE.CLIENT];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const createdOrder = await addOrder(newOrderData);

	return {
		error: null,
		res: createdOrder,
	};
};
