import { transformPost } from '../transformers';

export const getPosts = async () =>
	fetch('http://localhost:3005/posts')
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost));
