import { getComments, getProducts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchProducts = async (searchPhrase) => {
	// Просматривать посты может кто угодно. Поэтому проверку доступа (по ролям) не делаем

	// const { products, links } = await getProducts();
	// const comments = await getComments(); // Запрашиваем все комментарии, чтобы потом посмотреть сколько относится к нашей статье.
	// объединим в один Promise.all. Хсм. ниже) Два запроса будут отправлены одновременно и сэкономят некоторое время.

	const [{ products }, comments] = await Promise.all([
		getProducts(searchPhrase),
		getComments(),
	]);
	return {
		error: null,
		res: {
			products: products.map((product) => ({
				...product,
				commentsCount: getCommentsCount(comments, product.id),
			})),
		},
	};
};
