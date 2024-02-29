import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('fetchPost', postId).then((postData) => {
		if (postData.res) {
			// Если есть статья (результат), то отправляем данные статьи в redux store (записываем в сторе)
			dispatch(setPostData(postData.res));
		}

		return postData; // в любом случае возвращаем данные запроса с сервера, чтобы иметь возможность их обработать (посмотреть ошибки)
	});
