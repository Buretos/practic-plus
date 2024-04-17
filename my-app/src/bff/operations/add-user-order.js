import { addOrder, getUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getOrdersWithClient } from '../utils';

export const addUserOrder = async (
	hash,
	userId,
	productsInCart,
	paymentMethod,
	deliveryMethod,
) => {
	const accessRoles = [ROLE.CLIENT];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addOrder(userId, productsInCart, paymentMethod, deliveryMethod);

	const user = await getUser(userId);

	const orersWithClient = await getOrdersWithClient(userId);

	return {
		error: null,
		res: {
			...user,
			orders: orersWithClient,
		},
	};
};
