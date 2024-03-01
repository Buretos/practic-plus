import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { Comments, PostForm, PostContent } from './components';
import { useServerRequest } from '../../hooks';
import { RESET_POST_DATA, loadPostAsync } from '../../actions';
import { Error, PrivateContent } from '../../components';
import { selectPost } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true); // Чтобы реагироапть на загрузуу
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	// Данные поста сбрасываем при каждом монтировании компонента Post (чтобы синхронизировать с данными сервера). Для этого используем синхронный аналог useEffect, т.е. useLayoutEffect, который срабатывает  при его (поста) монтировании, а потом данные будут подгружаться уже через useEffect
	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		// В строке адреса статьи может существовать id реальной статьи. И любой знак после "/post" может интерпретироваться как id статьи. Поэтому когда привёт ответ после запроса на сервер, нужно проверить есть ли такая статья. Если нет, то нужно выдать ошибку "Такой статьи нет". Стоит посмотреть экшен loadPostAsync.
		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			// Проверяем полученный ответ, записываем ответ по ошибке (текст ошибки.или null) и устанавливаем её в state.
			setError(postData.error);
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, requestServer, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} error={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	// Смотрим есть ли ошибка. Если есть, то выдаём её, если нет, то выдаём контент ответа в зависимости от того просматриваем, редактируем или создаём статью (см. выше SpecificPostPage).
	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
