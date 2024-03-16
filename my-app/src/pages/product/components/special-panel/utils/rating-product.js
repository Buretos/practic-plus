export const ratingProduct = (comments) =>
	comments.length === 0
		? 0
		: comments.reduce((total, comment) => total + comment.evaluation, 0) /
		  comments.length;
