import { getComments, getUsers } from '../api';

export const getProductCommentsWithAuthor = async (productId) => {
	const comments = await getComments(productId);

	const users = await getUsers();

	return comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});
};
