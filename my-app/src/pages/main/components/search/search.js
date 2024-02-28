import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
// Управляемый ввод из родительского компонента приходит и искомаяя фраза и onChange
const SeacchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SeacchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 20px;

	& > input {
		padding: 10px 36px 10px 20px;
	}

	& > div {
		position: absolute;
		top: 4px;
		right: 10px;
	}
`;
