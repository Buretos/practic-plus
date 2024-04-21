export const transformOrder = (dbOrder) => ({
	id: dbOrder.id,
	userId: dbOrder.user_id,
	productsInCart: dbOrder.products_in_cart,
	paymentMethod: dbOrder.payment_method,
	deliveryMethodtent: dbOrder.delivery_method,
	statusId: dbOrder.status_id,
	createdOrderAt: dbOrder.created_order_at,
	lastChangedStatusOrderAt: dbOrder.last_changed_status_order_at,
	countAll: dbOrder.count_all,
	totalAmount: dbOrder.total_amount,
});
