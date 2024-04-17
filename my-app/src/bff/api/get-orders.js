import { transformOrder } from '../transformers';
// Если id статьи не передаётся, то запрашиваются все комментарии вообще.

const ALL_ORDERS_URL = 'http://localhost:3005/orders';
const USER_ORDERS_URL = 'http://localhost:3005/orders?user_id=';

export const getOrders = (userId) => {
	const url = userId === undefined ? ALL_ORDERS_URL : USER_ORDERS_URL + userId;
	return fetch(url)
		.then((loadedOrders) => loadedOrders.json())
		.then((loadedOrders) => loadedOrders.map(transformOrder));
};
