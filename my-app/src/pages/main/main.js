import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();
	// Запрос на просмотр статей есть для всех. Ошибку доступа не проверяем.
	useEffect(() => {
		requestServer('fetchPosts', page, searchPhrase, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				console.log('links-main:', links);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
	// благодаря useMemo ссылка на startDelayedSearch будет сохранятся между рендерами, она не будет сбрасываться и отработает нормально

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
						/>
					))}
				</div>
			) : (
				<div className="no-post-found">Статьи не найдены</div>
			)}
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
	}

	& .no-post-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}
`;
