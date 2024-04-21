export const getStatus = () =>
	fetch('http://localhost:3005/status').then((loadedStatus) => loadedStatus.json());
