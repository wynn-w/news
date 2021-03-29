'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

// 更新逻辑： 将当前操作用户的操作添加到当前文章的数据表上

exports.main = async (event, context) => {
	const {
		userId= '6061d10d4f25170001424d09', //默认身份为游客
		articleId,
		content
	} = event
	let user = await db.collection('user').doc(userId).get()
	user = user.data[0] // 当前用户数据
	let commentProps = {
		comment_id: genID(5), // 评论id
		comment_content: content, // 评论内容
		create_time: new Date().getTime(), // 创建时间
		// is_reply: is_reply, // 标记，区分主回复/子回复 
		author: {
			author_id: userId, // 作者id
			author_name: user.author_name, // 作者名称
			avatar: user.avatar, // 作者头像
			professional: user.professional // 职业
		},
		replys: []
	}
	await db.collection('article').doc(articleId).update({
		comments: dbCmd.unshift(commentProps)
	}) //返回：{"affectedDocs":1,"updated":1,"upsertedId":null}}
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据更新成功"
	}
};

function genID(length) {
	return Number(Math.random().toString().substring(3, length + 3) + Date.now()).toString(16)
}
