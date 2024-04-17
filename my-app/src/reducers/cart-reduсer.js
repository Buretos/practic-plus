import { ACTION_TYPE } from '../actions';
// Initial state
const initialCartState = {
	productsInCart: [],
};

// Reducer
export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TO_CART:
			const { cart } = state;
			const { payload: product } = action;
			const existingProductIndex = cart.findIndex((p) => p.id === product.id);

			if (existingProductIndex) {
				const updatedCart = [...cart];
				const existingCount = updatedCart[existingProductIndex].count || 0;
				updatedCart[existingProductIndex] = {
					...updatedCart[existingProductIndex],
					count: existingCount + 1,
				};
				return { ...state, cart: updatedCart };
			} else {
				return {
					...state,
					cart: [...cart.productsInCart, { ...cart.productsInCart, count: 1 }],
				};
			}
		case ACTION_TYPE.CLEAR_CART:
			return {
				...state,
				productsInCart: [], // Обнуление корзины
			};
		case ACTION_TYPE.REMOVE_FROM_CART:
			const updatedCart = state.productsInCart.reduce((newCatr, item) => {
				if (item.id === action.payload.id) {
					// Если count больше 1, уменьшаем на 1
					if (item.count > 1) {
						newCatr.push({ ...item, count: item.count - 1 });
					}
					// Если count равен 1, товар удаляется, поэтому здесь ничего не делаем
				} else {
					// Все остальные товары просто переходят в новый список
					newCatr.push(item);
				}
				return newCatr;
			}, []);

			return {
				...state,
				cart: updatedCart,
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
