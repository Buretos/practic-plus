import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { Comments, ProductForm, ProductContent } from './components';
import { useServerRequest } from '../../hooks';
import { RESET_PRODUCT_DATA, loadProductAsync } from '../../actions';
import { Error, Loader, PrivateContent } from '../../components';
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
		setIsLoading(true);
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
		// console.log('product', product);
	}, [dispatch, requestServer, params.id, isCreating, product.category_id]);
	// странная история с обновлением категории продукта. Она не обновляется сразу, только после перезагрузки страницы. Запись нового значения rdux store porduct выдает два ключа вместо одного categoryId со страрым значением ещё и category_id с актуальным значением. Не понимаю... поставил возвращаемое изменяемое актуальное значение в массив зависимостей для обновления чтения данных продукта. Теперь обновляется. Но было бы правильным просто передать пропсом в компонент, отражающий это значение, как это происходит с остальными полями. Причину столь странного поведения так и не понял.;

	const SpecificProductPage = isLoading ? (
		<Loader />
	) : isCreating || isEditing ? (
		<PrivateContent access={[ROLE.SALESMAN, ROLE.ADMIN]} error={error}>
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

// Проблема в том, что при изменении в product-form категории продкута, он записывается в базу, но не считывается оттдуа. При этом остальные данные обновляются. Я не могу понять, почему такое происходит... Надо посмотреть на действия по клавише Сохранить (флоппик). Что он делает с другими полями и почему катергория не меняется, пока не будет запрос к правильно записанной базе данных.
