import { useEffect, useMemo, useState } from 'react';
import { Pagination, ProductCard, Search } from './components';
import { useServerRequest } from '../../hooks';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false); // флаг, срабатывающий после истечения 2 секунд задержки в debounce
	const requestServer = useServerRequest();
	// Запрос на просмотр статей есть для всех. Ошибку доступа не проверяем.
	useEffect(() => {
		// Запрос поисковой фразы тоже будем отправлять сюда.
		requestServer('fetchProducts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { products, links } }) => {
				setProducts(products);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
	// startDelayedSearch спустя 2 секудны поменяет флаг поиска и поиск сработает в useEffect
	// благодаря useMemo ссылка на startDelayedSearch будет сохранятся между рендерами, она не будет сбрасываться и отработает нормально

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value); // устанавливаем searchPhrase из значения ввода
		startDelayedSearch(!shouldSearch); // через 2 секунды инвертируем (меняем) флаг поиска. При этом searchPhrase отправляется в операцию на серевер (см. useEffect)
	};

	return (
		<div className={className}>
			<div className="product-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{products.length > 0 ? (
					<div className="product-list">
						{products.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<ProductCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-product-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 80px;
	}

	& .no-product-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
