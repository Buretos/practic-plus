export const updsteOrder = ({ id, statusOrder, noteOrder }) =>
	fetch(`http://localhost:3005/orders/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			status_order: statusOrder,
			change_status_at: new Date(),
			note_order: noteOrder,
		}),
	}).then((createdOrder) => createdOrder.json());
