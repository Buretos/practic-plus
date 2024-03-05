export const getCategories = () =>
	fetch('http://localhost:3005/categories').then((loadedCategories) =>
		loadedCategories.json(),
	);
