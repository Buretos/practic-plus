export const getCommentsCountAndRating = (comments = [], productId) => {
	const productComments = comments.filter(
		({ productId: commentProductId }) => commentProductId === productId,
	);

	if (productComments.length === 0) {
		return [0, 0];
	}

	const productRating =
		productComments.reduce(
			(total, productComment) => total + productComment.evaluation,
			0,
		) / productComments.length;

	return [productComments.length, productRating];
};
