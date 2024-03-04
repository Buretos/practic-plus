import { addComment, getProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';
import { getProductCommentsWithAuthor } from '../utils';

export const addProductComment = async (hash, userId, productId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await addComment(userId, productId, content);

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
