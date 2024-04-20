import styled from 'styled-components';
import { H2 } from '../../components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';

const HistoryContainer = ({ className }) => {
	const [orders, setOrders] = useState([]);
	const requestServer = useServerRequest();
	const [users, setUsers] = useState([]); // Стейт массива users, добавляется с сервера
	const [roles, setRoles] = useState([]); // Стейт массива roles, добавляется с сервера
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		// Итак, проверка прошла успешно, теперь ответ должен вернуться и по пользователям и по ролям. Нам нужны оба ответа поэтому и Promise.all (для оптимизации скорости запросов), хотя можно запросить и по отдельности, но времени уйдёт больше.
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
			requestServer('fetchOrders'),
		]).then(([usersRes, rolesRes, ordersRes]) => {
			if (usersRes.error || rolesRes.error || ordersRes.error) {
				// Проверка ответа запросов на ошибки, если они есть, то текст соответствующей ошибки передаётся в errorMessage
				setErrorMessage(usersRes.error || rolesRes.error || ordersRes.error);
				console.log('errorMessage', errorMessage);
				return;
			}
			// После безошибочного ответа получаем и записываем массивы users и roles
			setUsers(usersRes.res);
			setRoles(rolesRes.res);
			setOrders(ordersRes.res);
			console.log('users', users);
			console.log('roles', roles);
			console.log('orders', orders);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<div>
				<H2>История покупок</H2>
			</div>

			{/* {users.map(
				// распечатка массива пользователей построчно
				({ id, login, registeredAt, roleId }) => (
					<div // Компонент строки пользователя
						key={id}
						id={id}
						login={login}
					>
						{id} - {login}
					</div>
				),
			)} */}

			{orders.map(
				// распечатка массива пользователей построчно
				({ id, userId, createdOrderAt }) => (
					<div // Компонент строки пользователя
						key={id}
						id={id}
						userId={userId}
						createdOrderAt={createdOrderAt}
					>
						{userId} - {createdOrderAt}
					</div>
				),
			)}
		</div>
	);
};

export const History = styled(HistoryContainer)`
display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	}
`;
