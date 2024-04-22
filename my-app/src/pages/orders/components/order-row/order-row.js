import styled from 'styled-components';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';
import { Order } from '../../../order/order';
import { useNavigate } from 'react-router-dom';

const OrderRowContainer = ({
	className,
	id,
	userLogin,
	createdOrderAt,
	deliveryMethod,
	paymentMethod,
	countAll,
	totalAmount,
	statusId,
	status,
	lastChangedStatusOrderAt,
}) => {
	const navigate = useNavigate();
	const [initialStatusId, setInitialStatusId] = useState(statusId); // изначальный статус заказа, отображаемый в поле выбора статусов (см. тег select)
	const [selectedStatusId, setSelectedStatusId] = useState(statusId); // Новый статус  из списка (перед выбором она соответствует текущей роли)
	const requestServer = useServerRequest(); // функция запроса на сервер

	const onStatusChange = ({ target }) => {
		// обработчик изменения статуса выбранной из  выпадающего списка
		setSelectedStatusId(Number(target.value)); // изменение id  статуса на выбранное значение поля, value={roleId}
	};

	const onStatusSave = (orderId, newOrderStatusId) => {
		// обработчик сохранения выбранного статуса
		requestServer('updateOrderStatus', orderId, newOrderStatusId).then(() => {
			// запрос на сервер и обновление id роли в методе orders
			setInitialStatusId(newOrderStatusId);
		});
	};

	const isSaveButtonDisabled = selectedStatusId === initialStatusId; // флаг выключения активности кнопки сохранить при совпадении выбранного  статуса с изначальным, т.е.  когда статус не изменился.

	console.log('userLogin', userLogin);

	const onOrderInfo = () => {
		navigate('/order', {
			state: {
				id,
				userLogin,
				createdOrderAt,
				deliveryMethod,
				paymentMethod,
				countAll,
				totalAmount,
				statusId,
				status,
				lastChangedStatusOrderAt,
			},
		});
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="id-column">{id}</div>
				<div className="login-column">{userLogin}</div>
				<div className="data-column">{createdOrderAt}</div>
				<div className="price-column">{totalAmount}</div>
				<div className="status-column">
					<select value={selectedStatusId} onChange={onStatusChange}>
						{status.map(
							(
								{ id: statusId, name: statusName }, // вывод выпадающего списка ролей (массивом map) по названию roleName контекст тега option, который соответствует полю name, и значению, соответствующему полю id массива roles, т.е. roleId
							) => (
								<option key={statusId} value={statusId}>
									{statusName}
								</option>
							),
						)}
					</select>
					<div className="save-role-button">
						<Icon
							id="fa-floppy-o"
							margin="0 0 0 10px"
							disabled={isSaveButtonDisabled}
							onClick={() => onStatusSave(id, selectedStatusId)}
						/>
					</div>
				</div>
			</TableRow>
			<Icon id="fa-info-circle" margin="0 0 0 20px" onClick={onOrderInfo} />
		</div>
	);
};

export const OrderRow = styled(OrderRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
		padding: 0 5px;
	}
`;
