import { transformProduct } from '../transformers';

// из документации json-server берем команды
// для поиска 'title_like=${searchPhrase}'
// и пагинации '_page=${page}&_limit=${limit}'

export const getProducts = async (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/products?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}));

// В объекте возвращаем страницы и ссылки для пагинации согласно документации json-server (нужен номер последней страницы last)
// title_like=${searchPhrase}&
