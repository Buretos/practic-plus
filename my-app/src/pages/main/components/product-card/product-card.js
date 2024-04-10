import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCategories } from '../../../../selectors';
import { Button, Icon } from '../../../../components';
import styled from 'styled-components';

const ProductCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	categoryId,
	model,
	quanthy,
	price,
	commentsCount,
	commentsRating,
	inCart,
	onClick,
}) => {
	const categories = useSelector(selectCategories);
	const categoryName = Object.values(categories)[categoryId].name;
	console.log('price', price);
	// На всякий случай. Object.values(myobj); - позволяет извлекать в массив значения ключей объекта myobj .

	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="product-card-footer">
					<h4>{title}</h4>
				</div>
				<div className="product-card-info1">
					<div className="category">
						<Icon
							inactive={true}
							id="fa-check-square-o"
							margin="2px 7px 0 0"
							size="18px"
						/>
						{model}
					</div>
					<div className="comments-count">
						<Icon
							inactive={true}
							id="fa-database"
							margin="0 7px 0 0"
							size="18px"
						/>
						{quanthy}
					</div>
					<div className="category">
						<Icon
							inactive={true}
							id="fa-rub"
							margin="0 7px 0 0"
							size="18px"
						/>
						{price}
					</div>
				</div>
				<div className="product-card-info2">
					<div className="category">
						<Icon
							inactive={true}
							id="fa-music"
							margin="2px 7px 0 0"
							size="18px"
						/>
						{categoryName}
					</div>
					<div className="price">
						<Icon
							inactive={true}
							id="fa-star"
							margin="0 7px 0 0"
							size="18px"
						/>
						{commentsRating}
					</div>
					<div className="comments-count">
						<Icon
							inactive={true}
							id="fa-comment-o"
							margin="0 7px 0 0"
							size="18px"
						/>
						{commentsCount}
					</div>
				</div>
			</Link>
			{inCart ? (
				<div></div>
			) : (
				<Button onClick={onClick} border="0" fontWeight="900">
					Купить
				</Button>
			)}
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .product-card-footer {
		padding: 5px 10px;
		border-top: 1px solid #000;
	}

	& h4 {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .product-card-info1 {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px 0;
	}

	& .product-card-info2 {
		display: flex;
		justify-content: space-between;
		padding: 0 10px 5px;
		border-bottom: 1px solid #000;
	}

	& .category {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}

	& .price {
		display: flex;
	}
`;

ProductCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	categoryId: PropTypes.number.isRequired,
	commentsCount: PropTypes.number.isRequired,
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}),
	),
};
