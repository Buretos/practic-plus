export const transformOrder = (dbOrder) => ({
	id: dbOrder.id,
	productsInCart: dbOrder.products_in_cart,
	paymentMethod: dbOrder.payment_method,
	deliveryMethodtent: dbOrder.delivery_method,
	statusOrder: dbOrder.status_order,
	createdOrderAt: dbOrder.created_order_at,
	lastChangedStatusOrderAt: dbOrder.last_changed_status_order_at,
});
