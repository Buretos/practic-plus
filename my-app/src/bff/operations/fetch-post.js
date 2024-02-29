import { getComments, getPost, getUsers } from '../api';

export const fetchPost = async (postId) => {
	// Обрабатываем ошибки (если они есть, например, нет статьи по такому postId). Так как запрашивали через async/await. Ошибки будут обрабатываться не через then/catch, a через try/catch. Если ошибки есть, то отправляем объект, где будет ошибка (error), а респонса нет (null). Если ошибок нет, то наоборот. Отрпавляем респонс, а ошибка равна null.
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAutor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
