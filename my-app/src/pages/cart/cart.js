import { useDispatch, useSelector } from 'react-redux';
// import { addToOrder } from '../../actions';
import { selectOrder } from '../../selectors';

import styled from 'styled-components';
import { H2 } from '../../components';
import { ProductCard } from '../main/components';

const CartContainer = ({ className }) => {
	// const dispatch = useDispatch();
	const order = useSelector(selectOrder);
	console.log('Корзина', order.order);
	return (
		<div className={className}>
			<div className="order">
				<H2>Корзина покупателя</H2>
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
							<div>Количество: {count} шт.</div>
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
`;
