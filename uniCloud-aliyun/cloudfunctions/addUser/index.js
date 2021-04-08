'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	let {
		avatarUrl,
		gender,
		nickName,
		openId
	} = event
	await db.collection('article')
	const userInfo = await db.collection('user')
		.where({
			open_id: openId
		})
		.get();

	if (userInfo.data.length != 0) {
		return {
			code: 201,
			msg: '用户已存在',
			data: userInfo.data
		}
	}
	gender = gender === 1 ? '男' : '女'
	 res = await db.collection('user').add({
		avatar: avatarUrl,
		gender: gender,
		author_name: nickName,
		open_id: openId,
		article_ids: [],
		article_likes_ids: [],
		author_likes_ids: [],
		explain: '',
		id: genID(13),
		integral_count: '',
		professional: '',
		fans_count: 0,
		follow_count: 0,
		thumbs_up_article_ids: [],
	})

	return {
		code: 200,
		msg: '用户注册成功',
		data: res
	}
};

function genID(length) {
	return Date.now().toString().substring(3, length + 3)
}
