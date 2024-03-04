import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveProductAsync } from '../../../../actions';
import { Icon, Input } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { SpecialPannel } from '../special-panel/special-panel';
import { sanizeContent } from './utils';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const ProductFormContainer = ({
	className,
	product: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	// Неуправляемая форма картики и заголовка не сбрасываем значение с предыдущего значения. Поэтому приходится обнулять данные в компоненте Product и рендерить при изменении в useLayoutEffect. Почему-то по другому не получалось сбросить значение полей при создании новой статьи
	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanizeContent(contentRef.current.innerHTML);

		// Мы делаем асинхронный экшен (хотя мы не используем вторую функцию dispatch в этом экшене) для того, чтобы получить промис, который после ответа от сервера позволит нам использовать функцию navigate, чтобы переключиться на страницу статьи.
		dispatch(
			saveProductAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPannel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={<Icon id="fa-floppy-o" size="22px" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="product-text"
			>
				{content}
			</div>
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .product-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

ProductForm.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
