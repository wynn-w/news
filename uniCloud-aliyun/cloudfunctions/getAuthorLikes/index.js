'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId = '60649c806e0c9a0001f9b995',
			// page = 1,
			// pageSize = 10
	} = event

	let userinfo = await db.collection('user').doc(userId).get()
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
