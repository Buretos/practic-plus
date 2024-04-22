export const addOrder = async (
	userId,
	productsInCart,
	paymentMethod,
	deliveryMethod,
	countAll,
	totalAmount,
) =>
	fetch('http://localhost:3005/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			user_id: userId,
			products_in_cart: productsInCart,
			payment_method: paymentMethod,
			delivery_method: deliveryMethod,
			status_id: 0,
			created_order_at: new Date().toISOString().split('T')[0],
			last_changed_status_order_at: new Date().toISOString().split('T')[0],
			count_all: countAll,
			total_amount: totalAmount,
		}),
	});
