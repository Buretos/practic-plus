import PropTypes from 'prop-types';
import { ROLE } from './role';

export const PROP_TYPE = {
	ROLE: PropTypes.oneOf(Object.values(ROLE)),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	COMMENT: PropTypes.shape({
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	PRODUCT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
};

// - PropTypes - это библиотека, предоставляемая React, для проверки типов свойств компонентов.
// - oneOf() - это один из множества методов, предоставляемых PropTypes, который может использоваться для проверки допустимости значения свойства.
// - Object.values() - это метод объекта JavaScript, который возвращает массив значений, содержащихся в объекте.
// - ROLE - это объект содержащий допустимые значения ролей.

// Таким образом, строка ROLE: PropTypes.oneOf(Object.values(ROLE)) говорит о том, что значение свойства ROLE должно быть одним из допустимых значений, указанных в объекте ROLE. Если значение не соответствует ни одному из допустимых значений, будет сгенерировано предупреждение. Это помогает обеспечить, что компонент будет использоваться с правильными значениями свойств.

//----------------------------------------------------

// Выражение COMMENT: PropTypes.shape({ ... }) означает, что свойство COMMENT должно быть объектом, который должен соответствовать указанной структуре. Все свойства объекта COMMENT, такие как id, author, content, и publishedAt, также имеют свои собственные типы PropTypes, определенные для них.
