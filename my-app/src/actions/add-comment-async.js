import { setProductData } from './set-product-data';

export const addCommentAsync =
	(requestServer, userId, productId, content, evaluation) => (dispatch) => {
		requestServer('addProductComment', userId, productId, content, evaluation).then(
			(productData) => {
				dispatch(setProductData(productData.res));
			},
		);
	};
