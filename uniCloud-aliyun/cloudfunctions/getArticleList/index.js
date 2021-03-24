'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		name,
		page = 1,
		pageSize = 10
	} = event
	let matchProp = {}
	if (name && name != '全部') {
		matchProp = {
			classify: name
		}
	}
	// 聚合筛选，实现仅返回查询类别数据
	let articleList = await db.collection('article').aggregate()
		.match(matchProp)
		.project({
			content: false,
			author: false,
		})
		.skip((page - 1) * pageSize) //跳过的数据
		.limit(pageSize)
		.end()

	return {
		code: 200,
		msg: "success",
		data: articleList.data
	}
};
