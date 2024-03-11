import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { Comments, ProductForm, ProductContent } from './components';
import { useServerRequest } from '../../hooks';
import { RESET_PRODUCT_DATA, loadProductAsync } from '../../actions';
import { Error, PrivateContent } from '../../components';
import { selectProduct } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams(); //  извлечения параметров из текущего URL
	const [isLoading, setIsLoading] = useState(true); // Чтобы реагироапть на загрузуу
	const isCreating = useMatch('/product'); // Возвращает данные соответствия о маршруте по заданному пути относительно текущего местоположения.
	const isEditing = useMatch('/product/:id/edit');
	const requestServer = useServerRequest();
	const product = useSelector(selectProduct);

	// Данные продукта сбрасываем при каждом монтировании компонента Product (чтобы синхронизировать с данными сервера). Для этого используем синхронный аналог useEffect, т.е. useLayoutEffect, который срабатывает  при его (поста) монтировании, а потом данные будут подгружаться уже через useEffect
	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		// В строке адреса товара  может существовать id реального товара. И любой знак после "/product" может интерпретироваться как id товара. Поэтому когда привёт ответ после запроса на сервер, нужно проверить есть ли такая статья. Если нет, то нужно выдать ошибку "Такой статьи нет". Стоит посмотреть экшен loadProductAsync.
		dispatch(loadProductAsync(requestServer, params.id)).then((productData) => {
			// Проверяем полученный ответ, записываем ответ по ошибке (текст ошибки.или null) и устанавливаем её в state.
			setError(productData.error);
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, requestServer, params.id, isCreating, product]);

	if (isLoading) {
		// кажется, это нужно для того чтобы не рендерить на экране ничего, чтобы было пусто во время загрузки. Сюда надо ставить лоадер, по идее...
		return null;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} error={error}>
				<div className={className}>
					<ProductForm product={product} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<ProductContent product={product} />
				<Comments comments={product.comments} productId={product.id} />
			</div>
		);

	// Смотрим есть ли ошибка. Если есть, то выдаём её, если нет, то выдаём контент ответа в зависимости от того просматриваем, редактируем или создаём статью товара  (см. выше SpecificProductPage).
	return error ? <Error error={error} /> : SpecificProductPage;
};

export const Product = styled(ProductContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
