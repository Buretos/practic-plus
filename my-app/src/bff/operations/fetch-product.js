import { getProduct } from '../api';
import { getProductCommentsWithAuthor } from '../utils';

export const fetchProduct = async (productId) => {
	// Обрабатываем ошибки (если они есть, например, нет статьи по такому productId). Так как запрашивали через async/await. Ошибки будут обрабатываться не через then/catch, a через try/catch. Если ошибки есть, то отправляем объект, где будет ошибка (error), а респонса нет (null). Если ошибок нет, то наоборот. Отрпавляем респонс, а ошибка равна null.
	let product;
	let error;

	try {
		product = await getProduct(productId);
	} catch (productError) {
		error = productError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	const commentsWithAutor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: {
			...product,
			comments: commentsWithAutor,
		},
	};
};
