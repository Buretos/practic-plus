import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from 'react-paginate'; // import Paginate from 'react-paginate';
import _ from 'lodash';
import { PAGINATION_LIMIT } from '../../constants';
import { useServerRequest } from '../../hooks';
import { ProductCard, Search, SortSelect, CategoriesSelect } from './components';
import { debounce } from './utils';
import styled from 'styled-components';
import { addToOrder } from '../../actions';
import { selectOrder } from '../../selectors';

const sortOption = [
	{
		value: 'NO',
		label: ' ',
		sort: (data) => _.orderBy(data, ['title'], ['no']),
	},
	{
		value: 'titleASC',
		label: 'по названию',
		sort: (data) => _.orderBy(data, ['title'], ['asc']),
	},
	{
		value: 'titleDESC',
		label: 'по названию (обратный пордяок)',
		sort: (data) => _.orderBy(data, ['title'], ['desc']),
	},
	{
		value: 'ratingASC',
		label: 'по рейтингу',
		sort: (data) => _.orderBy(data, ['commentsRating'], ['desc']),
	},
	{
		value: 'ratingDESC',
		label: 'по рейтингу (обратный пордяок)',
		sort: (data) => _.orderBy(data, ['commentsRating'], ['asc']),
	},
];

const MainContainer = ({ className }) => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchPhrase, setSearchPhrase] = useState('');
	// const [order, setOrder] = useState([]);
	const [shouldSearch, setShouldSearch] = useState(false); // флаг, срабатывающий после истечения 2 секунд задержки в debounce
	const [categoryId, setCategoryId] = useState(null);
	const [sorting, setSorting] = useState('NO'); //priceDESC
	const requestServer = useServerRequest();
	const handleCategoryChange = (category) => {
		setCategoryId(category);
	};

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
	};

	const handleAddToOrder = (product) => {
		dispatch(addToOrder(product));
	};
	// const addToOrder = (product) => {
	// 	setOrder((prevOrder) => {
	// 		// Проверяем, существует ли уже продукт с таким ID в массиве
	// 		const existingProductIndex = prevOrder.findIndex((p) => p.id === product.id);

	// 		// Если продукт с таким ID уже есть
	// 		if (existingProductIndex >= 0) {
	// 			// Сделать копию массива чтобы не мутировать состояние напрямую
	// 			const updatedOrder = [...prevOrder];

	// 			// Если у продукта уже есть поле count, увеличиваем его, иначе устанавливаем равным 1
	// 			const existingCount = updatedOrder[existingProductIndex].count || 0;
	// 			updatedOrder[existingProductIndex].count = existingCount + 1;

	// 			// Возвращаем обновлённый массив
	// 			return updatedOrder;
	// 		} else {
	// 			// Если продукта нет, добавляем его в массив с count равным 1
	// 			return [...prevOrder, { ...product, count: 1 }];
	// 		}
	// 	});
	// };

	// const addToOrder = (product) => {
	// 	setOrder([...order, product]);
	// };
	// addToOrder();
	console.log('Корзина', order);

	// Запрос на просмотр статей есть для всех. Ошибку доступа не проверяем.
	useEffect(() => {
		// Запрос поисковой фразы тоже будем отправлять сюда. // категории товаров тоже
		requestServer('fetchProducts', searchPhrase).then(({ res: products }) => {
			setProducts(products.products);
		});
		setSorting('NO');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, shouldSearch, categoryId]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
	// startDelayedSearch спустя 2 секудны поменяет флаг поиска и поиск сработает в useEffect
	// благодаря useMemo ссылка на startDelayedSearch будет сохранятся между рендерами, она не будет сбрасываться и отработает нормально

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value); // устанавливаем searchPhrase из значения ввода
		startDelayedSearch(!shouldSearch); // через 2 секунды инвертируем (меняем) флаг поиска. При этом searchPhrase отправляется в операцию на серевер (см. useEffect)
	};

	const filteredProducts = categoryId // фильтруем список полученный с сервера и отобранный по поисковой фразе (запрос на json-server с поисковой фразой)
		? products.filter((product) => product.categoryId.toString() === categoryId)
		: products;
	console.log('filteredProducts', filteredProducts);
	const startIndex = currentPage * PAGINATION_LIMIT; // Здесь PAGINATION_LIMIT = 9 - количество элементов на странице
	const endIndex = startIndex + PAGINATION_LIMIT; // Здесь PAGINATION_LIMIT = 9 - количество элементов на странице
	const currentProducts = filteredProducts.slice(startIndex, endIndex);

	const handleSort = (e) => {
		setSorting(e.target.value);
	};

	useEffect(() => {
		const sortObJ = sortOption.find((option) => option.value === sorting);
		if (sortObJ) {
			setProducts(sortObJ.sort(filteredProducts));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting, requestServer, categoryId]);

	return (
		<div className={className}>
			<div className="mainHeader">
				<div>
					<CategoriesSelect
						onChange={(e) => handleCategoryChange(e.target.value)}
					/>
				</div>
				<div>
					<SortSelect
						options={sortOption}
						onSort={handleSort}
						value={sorting}
					/>
				</div>
			</div>
			<div className="product-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{products.length > 0 ? (
					<div className="product-list">
						{currentProducts.map(
							({
								id,
								title,
								imageUrl,
								categoryId,
								model,
								quanthy,
								price,
								commentsCount,
								commentsRating,
							}) => (
								<ProductCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									categoryId={categoryId}
									model={model}
									quanthy={quanthy}
									price={price}
									commentsCount={commentsCount}
									commentsRating={commentsRating}
									onClick={() =>
										handleAddToOrder({
											id,
											title,
											imageUrl,
											categoryId,
											model,
											quanthy,
											price,
											commentsCount,
											commentsRating,
										})
									}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-product-found">Товары не найдены</div>
				)}
			</div>
			{products.length > PAGINATION_LIMIT && (
				<Paginate
					previousLabel="Предыдущая"
					nextLabel="Следующая"
					breakLabel="..."
					breakClassName="break-me"
					pageCount={Math.ceil(filteredProducts.length / PAGINATION_LIMIT)} // Здесь 9 - количество элементов на странице
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageChange}
					containerClassName="pagination"
					activeClassName="active"
				/>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .mainHeader {
		display: flex;
		justify-content: space-between;
	}

	& .selectCategory {
		margin: 20px;
		height: 40px;
		padding: 10px;
	}

	& .product-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 20px;
	}

	& .no-product-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		padding: 0;
		margin: 20px 20px 40px;
	}

	.pagination li {
		display: inline-block;
		margin-right: 10px;
		border: 1px solid #000;
	}

	.pagination li a {
		display: block;
		padding: 8px 12px;
		background-color: #f2f2f2;
		color: #333;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}

	.pagination li.active a,
	.pagination li a:hover {
		background-color: #ccc;
	}

	.pagination li.disabled a {
		pointer-events: none;
		opacity: 0.5;
	}
`;
