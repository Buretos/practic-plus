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

// const Categories = (selectedCategoryId, onCategoryChange, categories) => {
// 	<div>
// 		<select value={selectedCategoryId} onChange={onCategoryChange}>
// 			{Object.values(categories).map(
// 				(
// 					{ id: categoryId, name: categoryName }, // вывод выпадающего списка категорий (массивом map) по названию roleName контекст тега option, который соответствует полю name, и значению, соответствующему полю id массива roles, т.е. roleId
// 				) => (
// 					<option key={categoryId} value={categoryId}>
// 						{categoryName}
// 					</option>
// 				),
// 			)}
// 		</select>
// 	</div>;
// };

const ProductFormContainer = ({
	className,
	product: { id, title, imageUrl, content, categoryId },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl); // записываем в стейт переданную пропсом imageUrl
	const [titleValue, setTitleValue] = useState(title); // записываем в стейт переданную пропсом title
	const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId); // записываем в стейт переданную пропсом title
	const contentRef = useRef(null);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = useMatch('/product');
	const categories = useSelector(selectCategories);

	if (isCreating) {
		dispatch(RESET_PRODUCT_DATA);
	}

	// useEffect(() => {
	// 	requestServer('fetchCategories').then((categoriesData) => {
	// 		setCategories(categoriesData.res);
	// 	});
	// }, [requestServer]);

	// Неуправляемая форма картики и заголовка не сбрасываем значение с предыдущего значения. Поэтому приходится обнулять данные в компоненте Product и рендерить при изменении в useLayoutEffect. Почему-то по другому не получалось сбросить значение полей при создании новой статьи
	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanizeContent(contentRef.current.innerHTML);

		// Мы делаем асинхронный экшен (хотя мы не используем вторую функцию dispatch в этом экшене) для того, чтобы получить промис, который после ответа от сервера позволит нам использовать функцию navigate, чтобы переключиться на страницу статьи.
		dispatch(
			saveProductAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
				categoryId: selectedCategoryId,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onCategoryChange = ({ target }) => setSelectedCategoryId(Number(target.value));

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
				// categoriesList={
				// 	<Categories
				// 		selectedCategoryId={selectedCategoryId}
				// 		onCategoryChange={onCategoryChange}
				// 		categories={categories}
				// 	/>
				// }
				id={id}
				categoryId={categoryId}
				categories={categories}
				margin="20px 0"
				editButton={<Icon id="fa-floppy-o" size="22px" onClick={onSave} />}
			/>
			<div>
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
