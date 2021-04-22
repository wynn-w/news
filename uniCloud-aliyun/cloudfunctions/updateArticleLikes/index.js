'use strict';
// 文章收藏
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		userId,
		articleId
	} = event
	if (!userId ||!articleId) {
		return {
			code: 401,
			msg: '非法操作'
		}
	}
	const userinfo = await db.collection('user').doc(userId).get()
	const articleIdIds = userinfo.data[0].article_likes_ids
	let dbCmdFuns = null
	if (articleIdIds.includes(articleId)) {
		dbCmdFuns = dbCmd.pull(articleId)
	} else {
		dbCmdFuns = dbCmd.addToSet(articleId)
	}

	await db.collection('user').doc(userId).update({
		article_likes_ids: dbCmdFuns
	})
	return {
		code: 200,
		msg: '数据请求成功',
		data: userinfo.data[0]
	}
};
