import { setCategories } from './set-categories';

export const loadCategoriesAsync = (requestServer) => (dispatch) => {
	requestServer('fetchCategories').then((categoriesData) => {
		dispatch(setCategories(categoriesData.res));
		return categoriesData;
	});
};
