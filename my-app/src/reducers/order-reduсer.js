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
		case ACTION_TYPE.CLEAR_ORDER:
			return {
				...state,
				order: [], // Обнуление корзины
			};
		case ACTION_TYPE.REMOVE_FROM_ORDER:
			const updatedOrder = state.order.reduce((newOrder, item) => {
				if (item.id === action.payload.id) {
					// Если count больше 1, уменьшаем на 1
					if (item.count > 1) {
						newOrder.push({ ...item, count: item.count - 1 });
					}
					// Если count равен 1, товар удаляется, поэтому здесь ничего не делаем
				} else {
					// Все остальные товары просто переходят в новый список
					newOrder.push(item);
				}
				return newOrder;
			}, []);

			return {
				...state,
				order: updatedOrder,
			};
		// return {
		// 	...state,
		// 	order: state.order.map((item) => {;
		// 		if (item.id === action.payload.id) {
		// 			if (item.count > 1) {
		// 				// Уменьшаем количество товара
		// 				return { ...item, count: item.count - 1 };
		// 			} else {
		// 				// Удаляем товар полностью, если он один
		// 				return state.order.filter(
		// 					(item) => item.id !== action.payload.id,
		// 				);
		// 			}
		// 		} else {
		// 			return item;
		// 		}
		// 	}),
		// };

		default:
			return state;
	}
};
