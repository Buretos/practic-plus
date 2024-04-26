import { ACTION_TYPE } from '../actions';

const initialCategoriesState = []; // Пустой массив данных пока ничего не получено

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
