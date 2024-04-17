import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../selectors';
import styled from 'styled-components';
import { Button, H2 } from '../../components';
import { ProductCard } from '../main/components';
import { addToCart, clearCart, removeFromCart } from '../../actions';
import React, { useState } from 'react';
// import { checkAccess } from '../../utils';
// import { ROLE } from '../../constants';
// import { useNavigate } from 'react-router-dom';
// import { useServerRequest } from '../../hooks';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const countAll = cart.productsInCart.reduce((sum, item) => sum + item.count, 0);
	// const roleId = useSelector(selectUserRole);
	// const navigate = useNavigate();
	// const login = useSelector(selectUserLogin);
	// const requestServer = useServerRequest();

	// Добавленные состояния для способов доставки и оплаты
	const [deliveryMethod, setDeliveryMethod] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');

	const handleClearOrder = () => {
		dispatch(clearCart()); // Очистка корзины
	};

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};

	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(productId)); // Удаление одной единицы товара из корзины
	};

	// Проверяем, все ли условия для активации кнопки "Оформить заказ" выполнены
	const canCheckout = countAll > 0 && deliveryMethod && paymentMethod;

	// const isShopper = checkAccess([ROLE.CLIENT], roleId);
	console.log('hash');

	return (
		<div className={className}>
			<div className="order">
				<H2>Корзина покупателя</H2>
				{/* Выводим общее количество товаров */}
				<div>Всего товаров в корзине: {countAll} шт.</div>
				<Button onClick={handleClearOrder}>Очистить корзину</Button>
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
								inCart={true}
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
							<div>Цена за шт.: {price} руб.</div>
							<div>
								Всего за этот товар:
								<br /> {count} x {price} = {count * price} руб.
							</div>
						</div>
					</div>
				),
			)}

			<div className="checkout-options">
				<select
					onChange={(e) => setDeliveryMethod(e.target.value)}
					value={deliveryMethod}
				>
					<option value="">Выберите способ доставки</option>
					<option value="pickup">Самовывоз</option>
					<option value="courier">Доставка курьером</option>
					<option value="post">Почтовая отправка</option>
				</select>

				<select
					onChange={(e) => setPaymentMethod(e.target.value)}
					value={paymentMethod}
				>
					<option value="">Выберите способ оплаты</option>
					<option value="card">Банковской картой</option>
					<option value="cash">Наличными при получении</option>
					<option value="online">Онлайн-оплата</option>
				</select>

				<Button disabled={!canCheckout} onClick={() => {}}>
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

	& .checkout-options {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

		select {
			padding: 10px;
			min-width: 200px;
		}
	}
`;
