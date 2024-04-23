import { addProduct, updateProduct } from '../api'; // Идём к запросу (обращению) в db...
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const saveProduct = async (hash, newProductData) => {
	const accessRoles = [ROLE.SALESMAN, ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const savedProduct =
		newProductData.id === ''
			? await addProduct(newProductData)
			: await updateProduct(newProductData);

	return {
		error: null,
		res: savedProduct,
	};
};
