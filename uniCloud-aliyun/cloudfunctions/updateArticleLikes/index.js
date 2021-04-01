'use strict';
// 文章收藏
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		userId='60649c806e0c9a0001f9b995',
		articleId
	} = event

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