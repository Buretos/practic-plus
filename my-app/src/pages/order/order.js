import styled from 'styled-components';
import { Button, H2 } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductCard } from '../main/components';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../selectors';

const OrderContainer = ({ className }) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const categories = useSelector(selectCategories);

	// Проверка, есть ли состояние передано
	if (!state) {
		return <div>Заказ не найден</div>; // Рендерим что-то, если заказа нет
	}

	const {
		id,
		userLogin,
		productsInCart,
		createdOrderAt,
		deliveryMethod,
		paymentMethod,
		countAll,
		totalAmount,
		statusId,
		status,
		lastChangedStatusOrderAt,
	} = state;

	console.log('productsInCart', productsInCart);

	return (
		<div className={className}>
			<div className="order">
				<H2>Заказ id: {id}</H2>
				<div className="order-heder">
					Дата заказа: <b>{createdOrderAt}</b>
					<br />
					Покупатель: <b>{userLogin}</b>
					<br />
					Всего товаров в корзине: <b>{countAll}</b> шт. на сумму{' '}
					<b>{totalAmount}</b> руб.
					<br />
					Способ доставки: <b>{deliveryMethod}</b>
					<br />
					Способ оплаты: <b>{paymentMethod}</b>
					<br />
					Текущий статус:{' '}
					<b>{status.find((item) => item.id === statusId).name}</b>
					<br />
					Дата последнего изменения статуса: <b>{lastChangedStatusOrderAt}</b>
				</div>
			</div>
			{productsInCart.map(
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
				}) => {
					const categoryName = Object.values(categories)[categoryId].name;
					return (
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
									cardOnly={true}
								/>
							</div>
							<div className="product-info">
								<div>
									Название: <b>{title}</b>{' '}
								</div>
								<div>
									Категория товара: <b>{categoryName}</b>
								</div>
								<div>
									Модель: <b>{model}</b>
								</div>
								<div>
									Количество: <b>{count}</b> шт.
								</div>
								<div>
									Цена: <b>{price}</b> руб./шт.
								</div>
								<div>
									Всего за этот товар:
									<br /> <b>{count}</b> x <b>{price}</b> ={' '}
									<b>{count * price}</b> руб.
								</div>
							</div>
						</div>
					);
				},
			)}
			,
			<div className="checkout-options">
				<div className="bloc-select"></div>

				<Button className="button-order" onClick={() => navigate(-1)}>
					Вернуться назад
				</Button>
			</div>
		</div>
	);
};

export const Order = styled(OrderContainer)`
	width: 70%;
	margin: 0 auto;
	align-items: center;
	font-size: 18px;

	& .order-heder {
		margin: 0 0 30px;
		font-size: 22px;
	}

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

	& .button-order {
		height: 40px;
		margin: 10px 0 50px;
	}

	& .checkout-options {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;

		& .total-amount {
			margin: 40px 0 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 21px;
			text-align: center;
		}

		& .bloc-select {
			display: flex;
			justify-content: space-between;
		}

		select {
			padding: 10px;
			min-width: 200px;
			margin: 20px;
			width: 317px;
			font-size: 17px;
		}
	}
`;
