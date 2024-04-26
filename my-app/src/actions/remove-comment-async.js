import { setProductData } from './set-product-data';

export const removeCommentAsync = (requestServer, productId, id) => (dispatch) => {
	requestServer('removeProductComment', productId, id).then((productData) => {
		dispatch(setProductData(productData.res));
	});
};
