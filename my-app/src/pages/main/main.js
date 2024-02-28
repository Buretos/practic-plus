import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from './utils/get-last-page-from-links';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				// Запрос на просмотр статей есть для всех. Ошибку доступа не проверяем.
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			},
		);
	}, [requestServer, page]);

	return (
		<div className={className}>
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
`;
