'use strict';
const db = uniCloud.database();
const dbCmd = db.command.aggregate
exports.main = async (event, context) => {
	const {
		articleId,
		page = 1,
		pageSize = 10
	} = event

	const list = await db.collection('comment').aggregate()
		.match({
			article_id: articleId
		})
		.project({
			// article_id: 1,
			// _id:1,
			comments: 1
		})
		.unwind('$comments')//返回以comments字段为根节点的数据集
		.replaceRoot({
			newRoot: '$comments'
		}) 
		.skip((page - 1) * pageSize) //跳过的数据
		.limit(pageSize)
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
