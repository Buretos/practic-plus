export const getCommentsCount = (comments = [], productId) => {
	const productComments = comments.filter(
		({ productId: commentProductId }) => commentProductId === productId,
	);

	return productComments.length;
};
