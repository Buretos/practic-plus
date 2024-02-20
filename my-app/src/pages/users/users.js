import { useEffect, useState } from 'react';
import { Content, H2 } from '../../components';
import { useServerRequest } from '../../hooks';
import { TableRow, UserRow } from './components';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const requestServer = useServerRequest();
	const [shouIdUpdateUserList, setShouIdUpdateUserList] = useState(false);

	useEffect(() => {
		// ответ должен вернуться и по пользователям и по ролям. Нам нужны оба ответа
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);
	}, [requestServer, shouIdUpdateUserList]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouIdUpdateUserList(!shouIdUpdateUserList); // Инвертируем флаг рендеринга через юз-эффект.
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)} // Айди и на каждый элемент массива уже есть. Вешаем на кждый элемент массива обработчик.
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	font-size:18px;
	}
`;
