import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import {
	selectCart,
	selectUserId,
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../../../selectors';
import { clearCart, logout } from '../../../../actions';
import styled from 'styled-components';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 22px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);
	const session = useSelector(selectUserSession);
	const cart = useSelector(selectCart);
	const countAll = cart.productsInCart.reduce((sum, item) => sum + item.count, 0);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
		dispatch(clearCart()); // Очистка корзины
	};

	console.log('roleId', roleId);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button width="30%">
						<Link to="/login">Войти</Link>
					</Button>
				) : roleId === ROLE.CLIENT ? (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					title="Bернуться на предыдущую страницу"
					id="fa fa-arrow-left"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				{roleId === ROLE.CLIENT || roleId === ROLE.GUEST ? (
					<Link to="/cart">
						<div className="cart">
							<div className="iconCart">
								<Icon
									title="Корзина"
									id="fa-shopping-cart"
									margin="10px 0 0 10px"
								/>
							</div>
							<div className="countCart">{countAll}</div>
						</div>
					</Link>
				) : (
					<></>
				)}

				{(roleId === ROLE.CLIENT || roleId === ROLE.SALESMAN) && (
					<>
						<Link to="/orders">
							<Icon id="fa fa-archive" margin="10px 0 0 16px" />
						</Link>
					</>
				)}

				{isAdmin && (
					<>
						<Link to="/product">
							<Icon id="fa fa-plus" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-user-plus" margin="10px 0 0 16px" />
						</Link>
						<Link to="/orders">
							<Icon id="fa fa-archive" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	width: 250px;

	& .cart {
		display: flex;
	}

	& .iconCart {
		display: flex;
		justify-content: space-between;
	}

	& .countCart {
		display: flex;
		justify-content: space-between;
		margin: 17px 0 0 8px;
	}
`;
