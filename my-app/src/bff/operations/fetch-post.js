import { getComments, getPost, getUsers } from '../api';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	console.log('users:', users);

	const commentsWithAutor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});
	console.log('commentsWithAutor', commentsWithAutor);
	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
