import { getRoles } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const fetchRoles = async (userSession) => {
	const acsessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, acsessRoles)) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
