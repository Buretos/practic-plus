import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { H2, PrivateContent } from '../../components';
import { useServerRequest } from '../../hooks';
import { TableRow, UserRow } from './components';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils/check-access';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouIdUpdateUserList, setShouIdUpdateUserList] = useState(false);
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		// Сначала проверяем права доступа на страницу, чтобы лишний раз не запрашивать сервер. По хорошему эту проверку надо положить в каждый обработчик, и мы положим хотя тут ещё только один обработчик -)))
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
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
	}, [requestServer, shouIdUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		requestServer('removeUser', userId).then(() => {
			setShouIdUpdateUserList(!shouIdUpdateUserList); // Инвертируем флаг рендеринга через юз-эффект.
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
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
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	}
`;
