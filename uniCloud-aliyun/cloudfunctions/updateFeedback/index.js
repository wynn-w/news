'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		userId = "60649c806e0c9a0001f9b995",
			feedbackImages = [],
			content = ''
	} = event

	await db.collection('feedback').add({
		user_id: userId,
		feedback_images: feedbackImages,
		content: content
	})

	return {
		code: 200,
		msg: '反馈更新成功'
	}
};
