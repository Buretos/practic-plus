export const updateProduct = ({ id, imageUrl, title, content, categoryId }) =>
	fetch(`http://localhost:3005/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
			category_id: categoryId,
		}),
	}).then((loadedProduct) => loadedProduct.json());
