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

const SpecialPannelContainer = ({
	className,
	categoriesList,
	id,
	categoryId,
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
	const SpecificSpecialPanel = editButton.props.id; // переключатель спецификации специальной панели (удаление или редактирование)

	return SpecificSpecialPanel === 'fa-floppy-o' ? (
		<div className={className}>
			<div className="category">
				<Icon
					inactive={true}
					id="fa-calendar-o"
					margin="0 10px 0 0"
					size="18px"
				/>
				{categoriesList}
			</div>
			{isAdmin && <div className="buttons">{editButton}</div>}
		</div>
	) : (
		<div className={className}>
			<div className="category">
				{categoryName && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						margin="0 10px 0 0"
						size="18px"
					/>
				)}
				{categoryName}
			</div>
			{isAdmin && (
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

	& .buttons {
		display: flex;
	}

	& .category {
		display: flex;
	}

	& i {
		position: relative;
		top: 1px;
	}
`;

SpecialPannel.propTypes = {
	id: PropTypes.string.isRequired,
	categoryId: PropTypes.number.isRequired,
	editButton: PropTypes.node.isRequired,
};
