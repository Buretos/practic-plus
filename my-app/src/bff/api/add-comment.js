export const addComment = (userId, productId, content, evaluation) =>
	fetch('http://localhost:3005/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			product_id: productId,
			published_at: new Date().toISOString().split('T')[0],
			content,
			evaluation,
		}),
	});
