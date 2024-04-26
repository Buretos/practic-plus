import { deleteComment, getProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getProductCommentsWithAuthor } from '../utils';

export const removeProductComment = async (hash, productId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.SALESMAN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteComment(id);

	const product = await getProduct(productId);

	const commentsWithAutor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: {
			...product,
			comments: commentsWithAutor,
		},
	};
};
