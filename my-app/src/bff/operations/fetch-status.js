import { getStatus } from '../api';

export const fetchStatus = async () => {

	const roles = await getStatus();

	return {
		error: null,
		res: roles,
	};
};
