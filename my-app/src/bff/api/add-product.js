export const addProduct = ({ imageUrl, title, categoryId, content }) =>
	fetch('http://localhost:3005/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			category_id: categoryId,
			content,
		}),
	}).then((createdProduct) => createdProduct.json());
