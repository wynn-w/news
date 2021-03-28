'use strict';
const db = uniCloud.database()
const _ = db.command //db.command内含多种方法构建复杂的查询条件
exports.main = async (event, context) => {
	let {
		value = ''
	} = event
	// let value = '前端开发'
	// 聚合筛选，实现仅返回查询类别数据
	let articleList = await db.collection('article').where(_.or([{
			classify: {
				$regex: '.*' + value ,
				$options: '1'
			}
		}, {
			title: {
				$regex: '.*' + value ,
				$options: '1'
			}
		}]))
		.field({ content: false })
		.get();
	return {
		code: 200,
		msg: "success",
		data: articleList.data
	}
};
