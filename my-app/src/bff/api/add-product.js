import { generateDate } from '../utils';

export const addProduct = ({ imageUrl, title, content }) =>
	fetch('http://localhost:3005/products', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			published_at: generateDate(),
			title,
			content,
		}),
	}).then((createdProduct) => createdProduct.json());
