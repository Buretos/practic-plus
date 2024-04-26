import { setUser } from './set-user';

export const addOrderAsync =
	(
		requestServer,
		userId,
		productsInCart,
		paymentMethod,
		deliveryMethod,
		countAll,
		totalAmount,
	) =>
	(dispatch) => {
		requestServer(
			'addUserOrder',
			userId,
			productsInCart,
			paymentMethod,
			deliveryMethod,
			countAll,
			totalAmount,
		).then((userData) => {
			dispatch(setUser(userData.res));
		});
	};
