'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		userId,
		feedbackImages = [],
		content
	} = event
if (!userId || !content) {
		return {
			code: 401,
			msg: '非法操作'
		}
	}
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
