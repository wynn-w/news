'use strict';
const db = uniCloud.database();
const dbCmd = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId = '',
			articleId,
			page = 1,
			pageSize = 10
	} = event

	const list = await db.collection('article').aggregate()
		.match({
			_id: articleId
		}).unwind('$comments') //拆分 comments 字段
		.project({
			_id: 0,
			comments: 1
		})
		.replaceRoot({
			newRoot: '$comments'
		}) //返回以comments字段为根节点的数据集
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
