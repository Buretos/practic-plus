import { transformPost } from '../transformers';

// из документации json-server берем команды
// для поиска 'title_like=${searchPhrase}'
// и пагинации '_page=${page}&_limit=${limit}'

export const getPosts = async (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}));

// В объекте возвращаем страницы и ссылки для пагинации согласно документации json-server (нужен номер последней страницы last)
// title_like=${searchPhrase}&
