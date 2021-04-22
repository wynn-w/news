'use strict';
// 文章收藏
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	const {
		userId,
		page= 1,
		pageSize= 10
	} = event
	if(!userId){
		return{
			code: 401,
			msg:'非法操作'
		}
	}
	const userinfo = await db.collection('user').doc(userId).get()
	const articleIdIds = userinfo.data[0].article_likes_ids

	const lists = await db.collection('article').aggregate()
		.addFields({
			is_like: $.in(['$_id', articleIdIds])//查找 article 表的 _id 字段是否在 articleIdIds 数组里（返回 true/false）
		}).project({
			content: false
		}).match({
			is_like: true
		}).skip((page - 1) * pageSize)
		.limit(pageSize)
		.end()
	return {
		code: 200,
		msg: '数据请求成功',
		data: lists.data
	}
};
