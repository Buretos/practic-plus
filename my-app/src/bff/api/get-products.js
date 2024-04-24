import { transformProduct } from '../transformers';

// из документации json-server берем команды
// для поиска 'title_like=${searchPhrase}'

export const getProducts = async (searchPhrase) =>
	fetch(`http://localhost:3005/products?title_like=${searchPhrase}`)
		.then((loadedProducts) => loadedProducts.json())
		.then((loadedProducts) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
		}));
