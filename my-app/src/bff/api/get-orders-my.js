import { transformOrder, transformProduct } from '../transformers';
// Сначала смотрим есть ли статья. В случае отстуствия статьи по заданному адресу команда fetch выдаёт промис успешного запроса, который обрабатывается обычным .then. Т.е. ошибка 300-х и 400-х ответов это не ошибка запроса сервера (когда, например сервер не ответил), а ошибка контента данных на серевре. Сервер же успешно обработал запрос. Так ошибка 404 (статья не найдена) обрабатывается через then, а не через catch.
export const getOrdersMy = async () =>
	await fetch(`http://localhost:3005/products`)
		.then((loadedProduct) => loadedProduct.json())
		.then((loadedProduct) => transformProduct(loadedProduct));
