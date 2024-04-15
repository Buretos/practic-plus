import { useDispatch, useSelector } from 'react-redux';
import { selectOrder } from '../../selectors';
import styled from 'styled-components';
import { Button, H2 } from '../../components';
import { ProductCard } from '../main/components';
import { addToOrder, clearOrder, removeFromOrder } from '../../actions';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	const countAll = order.order.reduce((sum, item) => sum + item.count, 0);

	const handleClearOrder = () => {
		dispatch(clearOrder()); // Очистка корзины
	};

	const handleAddToOrder = (product) => {
		dispatch(addToOrder(product));
	};

	const handleRemoveFromOrder = (productId) => {
		dispatch(removeFromOrder(productId)); // Удаление одной единицы товара из корзины
	};

	// Функция для подсчёта общего количества товаров в корзине

	return (
		<div className={className}>
			<div className="order">
				<H2>Корзина покупателя</H2>
				{/* Выводим общее количество товаров */}
				<div>Всего товаров в корзине: {countAll} шт.</div>
				<Button onClick={handleClearOrder}>Очистить корзину</Button>
			</div>
			{order.order.map(
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
					count,
				}) => (
					<div className="product-bloc" key={id}>
						<div className="product-card">
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
								inCart={true}
							/>
						</div>
						<div className="product-info">
							{console.log('count ', count)}
							<div>Количество: {count} шт.</div>
							<div className="block-button-cart">
								<div className="button-cart">
									<Button
										onClick={() => handleRemoveFromOrder({ id })}
										border="0"
										fontWeight="900"
									>
										-1
									</Button>
								</div>
								<div className="button-cart">
									<Button
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
										border="0"
										fontWeight="900"
									>
										+1
									</Button>
								</div>
							</div>
							<div>Цена за шт.: {price} руб.</div>
							<div>
								Всего за этот товар:
								<br /> {count} x {price} = {count * price} руб.
							</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};

export const Cart = styled(CartContainer)`
	width: 70%;
	margin: 0 auto;
	align-items: center;

	& .order {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	& .product-bloc {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}

	& .product-card {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-rigth: 0 auto;
		width: 570px;
	}

	& .product-info {
		display: flex;
		flex-direction: column;
		margin: 20px;
		width: 570px;
		justify-content: space-between;
	}

	& .block-button-cart {
		display: flex;
	}

	& .button-cart {
		display: flex;
		justify-content: space-between;
		width: 80%;
	}
`;
