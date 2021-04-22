'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId,
			// page = 1,
			// pageSize = 10
	} = event
	if(!userId){
		return {
			code:401,
			msg:'非法操作'
		}
	}
	let userinfo = await db.collection('user').doc(userId).get()
	if(!userinfo.data.length === 0){
		return {
			code:404,
			msg:'用户不存在'
		}
	}
	userinfo = userinfo.data[0]
	
	let lists = await db.collection('user').aggregate()
		.addFields({
			is_like: $.in(['$id', userinfo.author_likes_ids], )
		}).match({
			is_like: true
		})
		// .skip((page - 1) * pageSize) //跳过的数据
		// .limit(pageSize)
		.end()


	return {
		code: 200,
		msg: '数据获取成功！',
		data: lists.data
	}
};
