import { useSelector } from 'react-redux';
import { server } from '../bff';
import { selectUserSession } from '../selectors';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession); // Получили сессию
	// Оборачиваем в useCallback чтобы сохранить ссылку на нашу функцию, что она не меняется, потому как useEffect (в компонентах, использующих этот хук) ругается что надо указать в зависимостях эту функцию а нам надо устранить лишний рендеринг страницы. Пока сессия не изменится ссылка на функцию тоже не изменится.
	return useCallback(
		(operation, ...params) => {
			// Формирование данных для запроса - request. Авторизация и регистрация не требует отправки сессии. Поэтому она не будет включена в параметры запроса. Для остальных операции будет включена как сессия, так и параметры. Выглядеть это будет (см. ниже).
			const request = ['register', 'authorize'].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
