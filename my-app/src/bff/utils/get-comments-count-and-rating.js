export const getCommentsCountAndRating = (comments = [], productId) => {
	const productComments = comments.filter(
		({ productId: commentProductId }) => commentProductId === productId,
	);

	if (productComments.length === 0) {
		return [0, 0];
	}

	const productRating = parseFloat(
		(
			productComments.reduce((total, comment) => total + comment.evaluation, 0) /
			productComments.length
		).toFixed(1),
	);

	return [productComments.length, productRating];
};
