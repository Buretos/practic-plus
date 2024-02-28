import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (searchPhrase, page, limit) => {
	// Просматривать посты может кто угодно. Поэтому проверку доступа (по ролям) не делаем

	// const { posts, links } = await getPosts();
	// const comments = await getComments(); // Запрашиваем все комментарии, чтобы потом посмотреть сколько относится к нашей статье.
	// объединим в один Promise.all. Хсм. ниже) Два запроса будут отправлены одновременно и сэкономят некоторое время.

	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments(),
	]);
	console.log('links;', links);
	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			links,
		},
	};
};
