export const transformProduct = (dbProduct) => ({
	id: dbProduct.id,
	title: dbProduct.title,
	content: dbProduct.content,
	imageUrl: dbProduct.image_url,
	categoryId: dbProduct.category_id,
});
