import { getPost } from '../api';
import { getPostCommentsWithAuthor } from '../utils';

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

	const commentsWithAutor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
