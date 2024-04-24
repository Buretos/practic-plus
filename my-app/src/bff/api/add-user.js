export const addUser = (login, password) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login, // <--когда ключ и значение совпадают, то можно использовать сокращённую запись (login: login,)
			password, // сокращённая запись
			registed_at: new Date().toISOString().split('T')[0],
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
