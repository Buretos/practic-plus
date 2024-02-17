export const sessions = {
	list: {},
	create(user) {
		const hash = Math.random().toFixed(50); // Создаём уникальный хэш с помощью генератора случайных чисел с фиксированной длинной после запятой в 50 знаков

		this.list[hash] = user; // Добавляем его в список

		return hash; // Возвращаем хэш
	},

	remove(hash) {
		// Удаление хэша для разлогинивания
		delete this.list[hash];
	},
};
