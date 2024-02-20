import { getUsers } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchUsers = async (userSession) => {
	const acsessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, acsessRoles)) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
