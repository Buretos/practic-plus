import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useServerRequest } from './hooks';
import { Error, Header, Footer, Modal } from './components';
import {
	Authorization,
	Main,
	Product,
	Registration,
	Users,
	Cart,
	History,
} from './pages';
import { loadCategoriesAsync, setUser } from './actions';
import { ERROR } from './constants';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 20px 20px;
`;

export const Gitarium = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData'); // считываем текущую авторизацию пользователя из sessionStorage (из браузера), который не стирается при обновлении вкладки. Записываем же данные при авторизации и регистрации командой: sessionStorage.setItem('userData', JSON.stringify(res)); Данные в sessionStorage хранятся в виде строк. Поэтому получаем в виде строки JSON, которую нужно преобразовать в объект.

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON); // Преобразование из формата строки JSON в объект.

		dispatch(
			// Обновляем стейт данными из sessionStorage
			setUser({
				// В sessionStorage все данные хранятся в строках. У нас в стейте не всё в строках. roleId у нас число. Поэтому мы переводим roleId из строкового значения в число и записываем в state правильно.
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch, requestServer]);

	dispatch(loadCategoriesAsync(requestServer)); // Записываю в стейт неизменяемые в программе данные список id - name категорий товаров.

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} /> {/* Главная страница */}
					<Route path="/login" element={<Authorization />} />{' '}
					{/* Страница авторизации */}
					<Route path="/register" element={<Registration />} />{' '}
					{/* Страница  регистрации */}
					{/* <Route path="/user" element={<User />} /> // Страница покупателя с историей заказов */}
					<Route path="/cart" element={<Cart />} />
					{/* Страница корзины покупателя  */}
					<Route path="/users" element={<Users />} />{' '}
					{/* Страница истории заказов */}
					<Route path="/history" element={<History />} />{' '}
					{/* Страница истории заказов покупателя*/}
					<Route path="/history/:id" element={<History />} />{' '}
					{/* Страница создания нового товара */}
					<Route path="/product/:id" element={<Product />} />{' '}
					{/* администрирование пользователей*/}
					<Route path="/product" element={<Product />} />{' '}
					{/* Страница  товара */}
					<Route path="/product/:id/edit" element={<Product />} />{' '}
					{/* Страница  редактирования товара */}
					<Route path="/*" element={<Error error={ERROR.PEGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};

// 1. На главной странице добавить выбор категории товара и сортировку
// 		1.1 Дополнить карточку поста=товара кнопкой купить, которая добавит 1 единицу товар в корзину
// 2. Дополнить страницу пост=торвар кнопкой купить, (которая добавит карточку товара в корзину) а так же количеством товара, категорией, и т.д.
// 3. Создать страницу корзина, куда переходить по кнопке из футера или хедера
// 		3.1 Отображать карточки выбранных товаров, количество, цену, общую стоимость.
// 		3.2 По кнопке (оформить заказ) предложить авторизоваться если не авторизован, или принять заказ (если залогинен). По выходе из аккаунта корзину обнулять. После оформления заказа корзина обнуляется. Выдать модальное окно вернуться к покупками или остатьса в пустой корзине.
// 4. Создать страницу пользователя, где будет информация о заказах (текущем и истории), куда сможет зайти пользователь или администратор
