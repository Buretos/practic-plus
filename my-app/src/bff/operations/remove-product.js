import { deleteComment, deleteProduct, getComments } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeProduct = async (hash, id) => {
	const accessRoles = [ROLE.SALESMAN, ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteProduct(id);

	const comments = await getComments(id);

	// comments - массив промисов, поэтому оборачиваем в оболочку Promise.all и ждём, когда он полностью отработает (await)
	await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

	return {
		error: null,
		res: true,
	};
};
