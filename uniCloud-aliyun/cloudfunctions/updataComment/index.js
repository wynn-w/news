'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

// 更新逻辑： 将当前操作用户的操作添加到当前文章的数据表上

exports.main = async (event, context) => {
	const {
		userId = '6061d10d4f25170001424d09', //默认身份为游客
			articleId,
			content,
			commentId = '', // 被评论 ID
			replyId = '', // 评论对象为 文章评论->评论->评论
			isReply = false, // 是否存在 文章评论->评论->评论 => 子回复
	} = event
	let user = await db.collection('user').doc(userId).get()
	user = user.data[0] // 当前用户数据
	let commentProps = {
		comment_id: genID(5), // 评论id
		comment_content: content, // 评论内容
		create_time: new Date().getTime(), // 创建时间
		is_reply: isReply, // 标记，区分主回复/子回复 
		author: {
			author_id: userId, // 作者id
			author_name: user.author_name, // 作者名称
			avatar: user.avatar, // 作者头像
			professional: user.professional // 职业
		},
		replys: []
	}

	// 回复对象为 文章
	if (commentId === '') {
		commentProps.replys = []
		commentProps = dbCmd.unshift(commentProps)
	}
	// 回复对象为 评论
	else {
		// 1.获取文章所有评论并定位到被回复评论,获取索引值
		const article = await db.collection('article').doc(articleId).get()
		const comments = article.data[0].comments
		let commentIndex = comments.findIndex(item => item.comment_id === commentId) //获取下标，即要更新项
		let commentAuthor=''
		// 2.获取被回复人 name 并赋值给 commentProps.to
		// 		2.1 子回复
		if (isReply) {
			// 从回复数组 reply 里查询
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === replyId)
		}
		// 		2.2 主回复
		else {
			commentAuthor = comments.find(item => item.comment_id === commentId) //获取一个评论信息
		}
		commentProps.to = commentAuthor.author.author_name
		// 3.更新数据库 replys 数组（未操作）
		commentProps = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentProps)
			}
		}
	}

	await db.collection('article').doc(articleId).update({
		comments: commentProps
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
