'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate //db.command内含多种方法构建复杂的查询条件

exports.main = async (event, context) => {
	const {
		userId = '',
			articleId
	} = event
	let list
	if(!articleId){
		return {
			code:401,
			msg:'非法操作'
		}
	}
	if (userId == '') {
		// 游客模式
		list = await db.collection('article')
			.aggregate()
			.addFields({
				// 是否关注作者
				is_author_like: false,
				// 是否收藏文章
				is_like: false,
				// 是否点赞
				is_thumbs_up: false
			})
			.match({
				_id: articleId
			})
			.project({
				// 评论
				coments: false
			})
			.end()

	} else {
		// 用户模式
		let user = await db.collection('user').doc(userId).get()
		user = user.data[0]
		list = await db.collection('article')
			.aggregate()
			.addFields({
				// 是否关注作者
				is_author_like: $.in(['$author.id', user.author_likes_ids]),
				// 是否收藏文章
				is_like: $.in(['$_id', user.article_likes_ids]),
				// 是否点赞
				is_thumbs_up: $.in(['$_id', user.thumbs_up_article_ids])
			})
			.match({
				_id: articleId
			})
			.project({
				// 评论
				coments: false
			})
			.end()
	}

	return {
		code: 200,
		msg: 'success',
		data: list.data[0]
	}
};
