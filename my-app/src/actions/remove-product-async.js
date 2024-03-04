export const removeProductAsync = (requestServer, id) => () =>
	requestServer('removeProduct', id);
