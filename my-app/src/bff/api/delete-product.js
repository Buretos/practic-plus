export const deleteProduct = async (id) =>
	fetch(`http://localhost:3005/products/${id}`, {
		method: 'DELETE',
	});
