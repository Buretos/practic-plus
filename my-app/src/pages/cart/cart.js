import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectUserId, selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { Button, H2 } from '../../components';
import { ProductCard } from '../main/components';
import { addOrderAsync, addToCart, clearCart, removeFromCart } from '../../actions';
import React, { useState } from 'react';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../hooks';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const userId = useSelector(selectUserId);
	const roleId = useSelector(selectUserRole);
	const countAll = cart.productsInCart.reduce((sum, item) => sum + item.count, 0);
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	// Добавленные состояния для способов доставки и оплаты
	const [deliveryMethod, setDeliveryMethod] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	// const shoper = login.toString();

	const totalAmount = cart.productsInCart.reduce((sum, item) => {
		return sum + parseFloat(item.price) * item.count;
	}, 0);

	const handleClearCart = () => {
		dispatch(clearCart()); // Очистка корзины
	};

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};

	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(productId)); // Удаление одной единицы товара из корзины
	};

	const handleCreateOrder = (
		userId,
		{ productsInCart },
		paymentMethod,
		deliveryMethod,
		countAll,
		totalAmount,
	) => {
		dispatch(
			addOrderAsync(
				requestServer,
				userId,
				productsInCart,
				paymentMethod,
				deliveryMethod,
				countAll,
				totalAmount,
			),
		);
		dispatch(clearCart());
		navigate(`/history/${userId}`);
	};

	// Проверяем, все ли условия для активации кнопки "Оформить заказ" выполнены
	const canCheckout = countAll > 0 && deliveryMethod && paymentMethod;

	const isClient = checkAccess([ROLE.CLIENT], roleId);
	console.log('isClient', isClient);

	return (
		<div className={className}>
			<div className="order">
				<H2>Корзина покупателя</H2>
				{/* Выводим общее количество товаров */}
				<div className="order-heder">Всего товаров в корзине: {countAll} шт.</div>
				<Button className="button-order" onClick={handleClearCart}>
					Очистить корзину
				</Button>
			</div>
			{cart.productsInCart.map(
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
								cardOnly={true}
							/>
						</div>
						<div className="product-info">
							{console.log('count ', count)}
							<div>Количество: {count} шт.</div>
							<div className="block-button-cart">
								<div className="button-cart">
									<Button
										onClick={() => handleRemoveFromCart({ id })}
										border="0"
										fontWeight="900"
									>
										-1
									</Button>
								</div>
								<div className="button-cart">
									<Button
										onClick={() =>
											handleAddToCart({
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
							<div>Цена: {price} руб./шт.</div>
							<div>
								Всего за этот товар:
								<br /> {count} x {price} = {count * price} руб.
							</div>
						</div>
					</div>
				),
			)}

			<div className="checkout-options">
				<div className="total-amount">
					Всего товаров в корзине: {countAll} шт.
					<br />
					Итоговая сумма: {totalAmount} руб.
				</div>
				<div className="bloc-select">
					<select
						onChange={(e) => setDeliveryMethod(e.target.value)}
						value={deliveryMethod}
					>
						<option value="">Выберите способ доставки</option>
						<option value="Самовывоз">Самовывоз</option>
						<option value="Доставка курьером">Доставка курьером</option>
						<option value="Почтовая отправка">Почтовая отправка</option>
					</select>

					<select
						onChange={(e) => setPaymentMethod(e.target.value)}
						value={paymentMethod}
					>
						<option value="">Выберите способ оплаты</option>
						<option value="Банковской картой">Банковской картой</option>
						<option value="Наличными при получении">
							Наличными при получении
						</option>
						<option value="Онлайн-оплата">Онлайн-оплата</option>
					</select>
				</div>

				<Button
					className="button-order"
					disabled={!canCheckout}
					onClick={() => {
						isClient
							? handleCreateOrder(
									userId,
									cart,
									paymentMethod,
									deliveryMethod,
									countAll,
									totalAmount,
							  )
							: navigate('/login');
					}}
				>
					Оформление заказа
				</Button>
			</div>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	width: 70%;
	margin: 0 auto;
	align-items: center;

	& .order-heder {
		margin: 0 0 30px;
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
