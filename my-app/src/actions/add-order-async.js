import { setUser } from './set-user';

export const addOrderAsync =
	(requestServer, userId, productsInCart, paymentMethod, deliveryMethod) =>
	(dispatch) => {
		requestServer(
			'addUserOrder',
			userId,
			productsInCart,
			paymentMethod,
			deliveryMethod,
		).then((userData) => {
			dispatch(setUser(userData.res));
		});
	};
