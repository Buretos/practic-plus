import { setProductData } from './set-product-data';

export const saveProductAsync = (requestServer, newProductData) => (dispatch) =>
	requestServer('saveProduct', newProductData).then((updatedProduct) => {
		dispatch(setProductData(updatedProduct.res));

		return updatedProduct.res;
	});
