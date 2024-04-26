import { getCategories } from '../api';

export const fetchCategories = async () => {
	// Проверка доступа не нужна. Любой может просматривать категории товаров

	const categories = await getCategories();

	return {
		error: null,
		res: categories,
	};
};
