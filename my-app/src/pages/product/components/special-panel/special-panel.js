import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removeProductAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectCategories, selectUserRole } from '../../../../selectors';
import styled from 'styled-components';
import { ratingProduct } from './utils/rating-product';
import { setUserRole } from '../../../../bff/api';

const SpecialPannelContainer = ({
	className,
	id,
	categoryId,
	comments,
	quanthy,
	price,
	editButton,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);
	const categories = useSelector(selectCategories);
	const categoryName = categories[categoryId].name;

	const onProductRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removeProductAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};
	const isAdmin = checkAccess([ROLE.ADMIN], userRole);
	const isSalesman = checkAccess([ROLE.SALESMAN], userRole);
	const SpecificSpecialPanel = editButton.props.id; // переключатель спецификации специальной панели (удаление или редактирование)

	return SpecificSpecialPanel === 'fa-floppy-o' ? (
		<div className={className}>
			{(isAdmin || isSalesman) && <div className="buttons">{editButton}</div>}
		</div>
	) : (
		<div className={className}>
			<div className="product-info">
				<Icon inactive={true} id="fa-music" margin="0 7px" size="18px" />
				{categoryName}
			</div>
			<div className="product-info">
				<Icon inactive={true} id="fa-thumbs-o-up" margin="0 7px" size="18px" />
				{ratingProduct(comments)}
			</div>
			<div className="product-info">
				<Icon inactive={true} id="fa-comment-o" margin="0 7px" size="18px" />
				{comments.length}
			</div>
			<div className="product-info">
				<Icon inactive={true} id="fa-database" margin="0 7px" size="18px" />
				{quanthy} шт.
			</div>
			<div className="product-info">
				<Icon inactive={true} id="fa-rub" margin="0 7px 0 0" size="18px" />
				{price}
			</div>
			{(isAdmin || isSalesman) && (
				<div className="buttons">
					{editButton}
					{categoryName && (
						<Icon
							id="fa-trash-o"
							size="22px"
							margin="0 0 0 15px"
							onClick={() => onProductRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPannel = styled(SpecialPannelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .category {
		display: flex;
	}

	& .buttons {
		display: flex;
	}

	& .product-info {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;

SpecialPannel.propTypes = {
	id: PropTypes.string.isRequired,
	categoryId: PropTypes.number.isRequired,
	editButton: PropTypes.node.isRequired,
};
