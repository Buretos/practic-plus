export const setOrderStatus = (orderId, statusId) =>
	fetch(`http://localhost:3005/orders/${orderId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			status_id: statusId,
			last_changed_status_order_at: new Date().toISOString().split('T')[0],
		}),
	});
