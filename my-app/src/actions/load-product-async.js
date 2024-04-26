import { setProductData } from './set-product-data';

export const loadProductAsync = (requestServer, productId) => (dispatch) =>
	requestServer('fetchProduct', productId).then((productData) => {
		if (productData.res) {
			// Если есть статья (результат), то отправляем данные статьи в redux store (записываем в сторе)
			dispatch(setProductData(productData.res));
		}

		return productData; // в любом случае возвращаем данные запроса с сервера, чтобы иметь возможность их обработать (посмотреть ошибки)
	});
