import { setOrderData } from './set-order-data';

export const addOrderAsync = (requestServer, newOrderData) => (dispatch) =>
	requestServer('createOrder', newOrderData).then((updatedOrder) => {
		dispatch(setOrderData(updatedOrder.res));

		return updatedOrder.res;
	});
