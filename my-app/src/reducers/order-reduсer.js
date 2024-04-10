import { ACTION_TYPE } from '../actions';
// Initial state
const initialState = {
	order: [],
};

// Reducer
export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TO_ORDER:
			const { order } = state;
			const { payload: product } = action;
			const existingProductIndex = order.findIndex((p) => p.id === product.id);

			if (existingProductIndex >= 0) {
				const updatedOrder = [...order];
				const existingCount = updatedOrder[existingProductIndex].count || 0;
				updatedOrder[existingProductIndex] = {
					...updatedOrder[existingProductIndex],
					count: existingCount + 1,
				};
				return { ...state, order: updatedOrder };
			} else {
				return { ...state, order: [...order, { ...product, count: 1 }] };
			}

		default:
			return state;
	}
};
