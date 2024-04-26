export const updateProduct = ({
	id,
	imageUrl,
	title,
	categoryId,
	manufacturer,
	model,
	quanthy,
	price,
	content,
}) =>
	fetch(`http://localhost:3005/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			category_id: categoryId,
			manufacturer,
			model,
			quanthy,
			price,
			content,
		}),
	}).then((loadedProduct) => loadedProduct.json());
