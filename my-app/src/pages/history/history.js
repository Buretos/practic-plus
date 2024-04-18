import styled from 'styled-components';
import { H2 } from '../../components';

const HistoryContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>
				<H2>История покупок</H2>
			</div>
		</div>
	);
};

export const History = styled(HistoryContainer)`
display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	}
`;
