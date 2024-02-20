import { setUserRole } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateUserRole = async (userSession, userId, newUserRoleId) => {
	const acsessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, acsessRoles)) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await setUserRole(userId, newUserRoleId);

	return {
		error: null,
		res: true,
	};
};
