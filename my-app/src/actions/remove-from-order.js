import { ACTION_TYPE } from './action-type';

export const removeFromOrder = (productId) => ({
	type: ACTION_TYPE.REMOVE_FROM_ORDER,
	payload: productId,
});
