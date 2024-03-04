import { setProductData } from './set-product-data';

export const addCommentAsync =
	(requestServer, userId, productId, content) => (dispatch) => {
		requestServer('addProductComment', userId, productId, content).then(
			(productData) => {
				dispatch(setProductData(productData.res));
			},
		);
	};
