import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const ProductCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	categoryId,
	commentsCount,
	categories,
}) => {
	// выбираю из массива объектов элемент по id. Получается, что это массив одного элемента внутри которого находится обхект с вдумя ключами. Вот я его по ключу name и достаю.
	const categoryName = categories.filter(({ id }) => id === categoryId)[0].name;

	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="product-card-footer">
					<h4>{title}</h4>
				</div>
			</Link>
			<div className="product-card-info">
				<div className="published-at">
					<Icon
						inactive={true}
						id="fa-align-justify"
						margin="0 7px 0 0"
						size="18px"
					/>
					{categoryName}
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
	}

	& .product-card-info {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
	}

	& .published-at {
		display: flex;
	}

	& .comments-count {
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
