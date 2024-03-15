import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { Icon } from '../../../../../../components';
import { useServerRequest } from '../../../../../../hooks';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import styled from 'styled-components';

const CommentContainer = ({
	className,
	productId,
	id,
	author,
	content,
	evaluation,
	publishedAt,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, productId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrSalesman = [ROLE.ADMIN, ROLE.SALESMAN].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="information-author-evaluation">
						<div className="author">
							<Icon
								inactive={true}
								id="fa-user-circle-o"
								size="18px"
								margin="0 10px 0 0"
								onClick={() => {}}
							/>
							{author}
						</div>
						<div className="evaluation-comment">
							<Icon
								background="#fff"
								inactive={true}
								id="fa fa-star"
								size="18px"
								margin="0 10px 0 0"
								onClick={() => {}}
							/>
							{evaluation}
						</div>
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 10px 0 0"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrSalesman && (
				<Icon
					id="fa-trash-o"
					size="22px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	width: 800px;
	display: flex;
	margin-top: 10px;


	& .comment {
		width: 770px;
		border: 1px solid #000;
		padding: 5px 10px;z

	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .information-author-evaluation {
		display: flex;
	}

	& .author {
		display: flex;
	}

	& .evaluation-comment {
		display: flex;
		margin-left:25px;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	productId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
