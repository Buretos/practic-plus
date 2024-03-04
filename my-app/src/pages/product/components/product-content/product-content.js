import { useNavigate } from 'react-router-dom';
import { H2, Icon } from '../../../../components';
import { SpecialPannel } from '../special-panel/special-panel';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const ProductContentContainer = ({
	className,
	product: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPannel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="22px"
						onClick={() => navigate(`/product/${id}/edit`)}
					/>
				}
			/>
			<div className="product-text">{content}</div>
		</div>
	);
};

export const ProductContent = styled(ProductContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .product-text {
		font-size: 18px;
		white-space: pre-line;
		margin-bottom: 20px;
	}
`;

ProductContent.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
