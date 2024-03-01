import { getSession, addSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50); // Создаём уникальный хэш с помощью генератора случайных чисел с фиксированной длинной после запятой в 50 знаков

		addSession(hash, user); // Записываем сессию в sessions: (db json-server). Запишется она осинхронно в синхронном коде, главное, чтобы не было ошибок и на этом мы не зацикливаемся

		return hash; // Возвращаем хэш
	},

	async remove(hash) {
		// Удаление хэша для разлогинивания
		const session = await getSession(hash); // находим сессию по хешу

		if (!session) {
			return;
		}

		deleteSession(session.id);
	},

	async access(hash, acsessRoles) {
		// получавем сессию с сервера (асинхронно, ждём).
		const dbSession = await getSession(hash);

		// проверяем, что пользователь есть (зологинился, есть пользователь с таким хэшем), и его роль находится в списке ролей, которые имеют доступ. У нас это только одна роль администратора.
		return !!dbSession?.user && acsessRoles.includes(dbSession.user.roleId);
	},
};
