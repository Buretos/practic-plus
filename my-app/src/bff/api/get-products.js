import { transformProduct } from '../transformers';

// из документации json-server берем команды
// для поиска 'title_like=${searchPhrase}'
// и пагинации '_page=${page}&_limit=${limit}'

export const getProducts = async (searchPhrase) =>
	fetch(`http://localhost:3005/products?title_like=${searchPhrase}`)
		.then((loadedProducts) => loadedProducts.json())
		.then((loadedProducts) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
		}));

// В объекте возвращаем страницы и ссылки для пагинации согласно документации json-server (нужен номер последней страницы last)
// title_like=${searchPhrase}&
// 		`http://localhost:3005/products?title_like=${searchPhrase}&_category_id=${categoryId}&_page=${page}&_limit=${limit}`,
