import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async () => {
	// Просматривать посты может кто угодно. Поэтому проверку доступа (по ролям) не делаем

	// const posts = await getPosts();
	// const comments = await getComments(); // Запрашиваем все комментарии, чтобы потом посмотреть сколько относится к нашей статье.
	// объединим в один Promise.all. Хсм. ниже) Два запроса будут отправлены одновременно и сэкономят некоторое время.

	const [posts, comments] = await Promise.all([getPosts(), getComments()]);

	return {
		error: null,
		res: posts.map((post) => ({
			...post,
			commentsCount: getCommentsCount(comments, post.id),
		})),
	};
};
