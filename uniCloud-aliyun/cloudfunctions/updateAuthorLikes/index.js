'use strict';
const db = uniCloud.database();
const dbcmd = db.command;

exports.main = async (event, context) => {

	const {
		userId,
		authorId
	} = event;
	if (!userId || !authorId) {
		return {
			code: 401,
			msg: '非法操作'
		}
	}
	let user = await db.collection('user').doc(userId).get();
	let authorLikesIds = user.data[0].author_likes_ids;
	let authorIds = null
	// 存在即取关->数组元素删除
	if (authorLikesIds.includes(authorId)) {
		authorIds = dbcmd.pull(authorId);
	}
	// 不存在即关注->数组元素添加
	else {
		authorIds = dbcmd.addToSet(authorId);
	}

	await db.collection('user').doc(userId).update({
		author_likes_ids: authorIds
	})
	// let a = await db.collection('user').doc(userId)
	// let b = a.get().data[0].author_likes_ids;
	user = await db.collection('user').doc(userId).get();
	authorLikesIds = user.data[0].author_likes_ids;
	//返回数据给客户端
	return {
		code: 200,
		msg: '关注更新成功',
		authorLikesIds
	}
};
