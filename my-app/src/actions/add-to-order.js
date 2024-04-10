import { ACTION_TYPE } from './action-type';

export const addToOrder = (product) => {
	return {
		type: ACTION_TYPE.ADD_TO_ORDER,
		payload: product,
	};
};
