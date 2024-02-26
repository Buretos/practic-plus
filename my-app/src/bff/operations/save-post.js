import { addPost, updatePost } from '../api'; // Идём к запросу (обращению) в db...
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const savedPost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
