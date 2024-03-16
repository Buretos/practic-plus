import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { RESET_PRODUCT_DATA, saveProductAsync } from '../../../../actions';
import { Icon, Input } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import { SpecialPannel } from '../special-panel/special-panel';
import { sanizeContent } from './utils';
import { PROP_TYPE } from '../../../../constants';
import { selectCategories } from '../../../../selectors';
import styled from 'styled-components';

const ProductFormContainer = ({
	className,
	product: {
		id,
		title,
		imageUrl,
		categoryId,
		manufacturer,
		model,
		quanthy,
		price,
		content,
	},
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl); // записываем в стейт переданную пропсом imageUrl
	const [titleValue, setTitleValue] = useState(title); // записываем в стейт переданную пропсом title
	const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId); // записываем в стейт переданную пропсом title
	const [manufacturerValue, setManufacturerValue] = useState(''); // записываем в стейт переданную пропсом title
	const [modelValue, setModelValue] = useState(''); // записываем в стейт переданную пропсом title
	const [quanthyValue, setQuanthyValue] = useState(0); // записываем в стейт переданную пропсом title
	const [priceValue, setPriceValue] = useState(0); // записываем в стейт переданную пропсом title
	const contentRef = useRef(null);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = useMatch('/product');
	let titleProductForm = 'Редактирование информации о товаре';

	if (isCreating) {
		dispatch(RESET_PRODUCT_DATA);
		titleProductForm = 'Создание новой карточки информации о товаре';
	}
	// Неуправляемая форма картики и заголовка не сбрасываем значение с предыдущего значения. Поэтому приходится обнулять данные в компоненте Product и рендерить при изменении в useLayoutEffect. Почему-то по другому не получалось сбросить значение полей при создании новой статьи

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
		setSelectedCategoryId(categoryId);
		setManufacturerValue(manufacturer);
		setModelValue(model);
		setQuanthyValue(quanthy);
		setPriceValue(price);
	}, [imageUrl, title, manufacturer, model, quanthy, price, categoryId]);

	const onSave = () => {
		const newContent = sanizeContent(contentRef.current.innerHTML);

		// Мы делаем асинхронный экшен (хотя мы не используем вторую функцию dispatch в этом экшене) для того, чтобы получить промис, который после ответа от сервера позволит нам использовать функцию navigate, чтобы переключиться на страницу статьи.
		dispatch(
			saveProductAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				categoryId: selectedCategoryId,
				manufacturer: manufacturerValue,
				model: modelValue,
				quanthy: quanthyValue,
				price: priceValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onCategoryChange = ({ target }) => setSelectedCategoryId(Number(target.value));
	const onManufacturerChange = ({ target }) => setManufacturerValue(target.value);
	const onModelChange = ({ target }) => setModelValue(target.value);
	const onQuanthyChange = ({ target }) => {
		setQuanthyValue(Number(target.value));
	};
	const onPriceChange = ({ target }) => {
		setPriceValue(Number(target.value).toFixed(2));
	};

	const categories = useSelector(selectCategories);

	return (
		<div className={className}>
			<div className="productFormHeader">
				<h2>{titleProductForm}</h2>
			</div>
			{!isCreating && <div className="titleField">Изображение (url) ...</div>}
			<Input
				value={imageUrlValue}
				placeholder="Изображение (url) ..."
				onChange={onImageChange}
			/>
			{!isCreating && <div className="titleField">Название товара ...</div>}

			<Input
				value={titleValue}
				placeholder="Название товара ..."
				onChange={onTitleChange}
			/>
			<div className="containerSpecialPanel">
				<div className="selectCategories">
					<span>Категоря товара:&nbsp;</span>
					<select value={selectedCategoryId} onChange={onCategoryChange}>
						{Object.values(categories).map(
							(
								{ id: categoryId, name: categoryName }, // вывод выпадающего списка категорий (массивом map) по названию roleName контекст тега option, который соответствует полю name, и значению, соответствующему полю id массива roles, т.е. roleId
							) => (
								<option key={categoryId} value={categoryId}>
									{categoryName}
								</option>
							),
						)}
					</select>
				</div>
				<div className="specialPanel">
					<SpecialPannel
						id={id}
						categoryId={categoryId}
						categories={categories}
						margin="0"
						editButton={
							<Icon id="fa-floppy-o" size="22px" onClick={onSave} />
						}
					/>
				</div>
			</div>
			<div>
				{!isCreating && <div className="titleField">Производитель товара...</div>}

				<Input
					value={manufacturerValue}
					placeholder="Производитель товара..."
					onChange={onManufacturerChange}
				/>
				{!isCreating && <div className="titleField">Модель товара...</div>}

				<Input
					value={modelValue}
					placeholder="Модель товара..."
					onChange={onModelChange}
				/>
				<div className="titleField">Количество товара...</div>
				<Input
					type="number"
					step="1"
					min="0"
					value={quanthyValue}
					placeholder="Количество товара..."
					onChange={onQuanthyChange}
				/>
				<div className="titleField">Цена товара...</div>
				<Input
					type="number"
					step="0.01"
					min="0"
					value={priceValue}
					placeholder="Цена товара..."
					onChange={onPriceChange}
				/>
			</div>
			<div> Описание товара</div>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="product-text"
				placeholder="Описание товара..."
			>
				{content}
			</div>
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	& .productFormHeader {
		text-align: center;
	}

	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& select {
		padding: 0 0 0 5px;
	}

	& .containerSpecialPanel {
		display: flex;
		justify-content: space-between;
		margin: 1% 0;
		height: 30px;
	}

	& .selectCategories {
		display: flex;
		width: 400px;
	}

	& .specialPanel {
		display: flex;
	}

	& .product-text {
		margin-top: 3px;
		padding: 10px;
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}

	& .titleField {
		margin-bottom: 3px;
	}
`;

ProductForm.propTypes = {
	product: PROP_TYPE.PRODUCT.isRequired,
};
