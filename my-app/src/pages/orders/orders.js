import styled from 'styled-components';
import { H2, PrivateContent } from '../../components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { TableRow } from './components/table-row/table-row';
import { OrderRow } from './components/order-row/order-row';

const OrdersContainer = ({ className }) => {
	const [orders, setOrders] = useState([]);
	const [users, setUsers] = useState([]); // Стейт массива users, добавляется с сервера
	const [status, setStatus] = useState([]); // Стейт массива status, добавляется с сервера
	const requestServer = useServerRequest();
	const [errorMessage, setErrorMessage] = useState(null);
	const userRole = useSelector(selectUserRole); // роль текущего пользователя, вошедшего в сессию (берётся из селектора store redux)

	useEffect(() => {
		// Обращение к серверу через useEffect
		// Сначала проверяем права доступа текущего пользователя на страницу, чтобы лишний раз не запрашивать сервер. По хорошему эту проверку надо положить в каждый обработчик, и мы положим хотя в этом компоненте есть ещё только один обработчик -)))
		if (!checkAccess([ROLE.SALESMAN, ROLE.ADMIN], userRole)) {
			return;
		}

		// Итак, проверка прошла успешно, теперь ответ должен вернуться и по пользователям и по ролям. Нам нужны оба ответа поэтому и Promise.all (для оптимизации скорости запросов), хотя можно запросить и по отдельности, но времени уйдёт больше.
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchStatus'),
			requestServer('fetchOrders'),
		]).then(([usersRes, statusRes, ordersRes]) => {
			if (usersRes.error || statusRes.error || ordersRes.error) {
				// Проверка ответа запросов на ошибки, если они есть, то текст соответствующей ошибки передаётся в errorMessage
				setErrorMessage(usersRes.error || statusRes.error || ordersRes.error);
				console.log('errorMessage', errorMessage);
				return;
			}
			// После безошибочного ответа получаем и записываем массивы users и roles
			setUsers(usersRes.res);
			setStatus(statusRes.res);
			setOrders(ordersRes.res);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, userRole]);

	return (
		// PrivateContent -обёртка содержимого приватной страницы (проверяет права пользователя и принимает текст ошибки )
		<PrivateContent access={[ROLE.SALESMAN, ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Заказы</H2>
				<div className="table-bloc">
					<div>
						<TableRow>
							<div className="id-column">id</div>
							<div className="login-column">Покупатель</div>
							<div className="data-column">Дата</div>
							<div className="price-column">Сумма</div>
							<div className="status-column">Статус заказа</div>
						</TableRow>
					</div>
					{orders.map(
						// распечатка массива товаров построчно
						({
							id,
							userId,
							createdOrderAt,
							deliveryMethod,
							paymentMethod,
							countAll,
							totalAmount,
							statusId,
							lastChangedStatusOrderAt,
						}) => {
							const user = users.find((user) => user.id === userId);
							// Получить login (или name) пользователя
							const userLogin = user
								? user.login
								: 'Неизвестный пользователь';

							return (
								<OrderRow // Компонент строки пользователя
									key={id}
									id={id}
									userLogin={userLogin}
									createdOrderAt={createdOrderAt}
									deliveryMethod={deliveryMethod}
									paymentMethod={paymentMethod}
									countAll={countAll}
									totalAmount={totalAmount}
									statusId={statusId}
									status={status}
									lastChangedStatusOrderAt={lastChangedStatusOrderAt}
								/>
							);
						},
					)}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Orders = styled(OrdersContainer)`
display: flex;
	align-items: center;
	flex-direction: column;
	margin: auto ;
	width: 100%;
	}

& .table-bloc {
	width: 80%;
}
`;
