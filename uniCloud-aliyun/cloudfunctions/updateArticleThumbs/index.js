'use strict';
// 文章点赞
const db=uniCloud.database();
const dbCmd=db.command;
exports.main = async (event, context) => {
	const {
		userId = '60649c806e0c9a0001f9b995',
		articleId
	} = event;
	
	const user =await db.collection('user').doc(userId).get();
	const thumbsUpArticleIds = user.data[0].thumbs_up_article_ids;
	
	let thumbsIds=null;
	
	if(thumbsUpArticleIds.indexOf(articleId) > -1){
		return {
			code:200,
			msg:'已点过赞了！'
		}
	}
	thumbsIds=dbCmd.addToSet(articleId)
	
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids:thumbsIds
	})
	
	//更新 article 表的点赞数
	await db.collection('article').doc(articleId).update({
		thumbs_up_count:dbCmd.inc(1) //原子操作，直接在数据上 + 1
	})
	
	return {
		code:200,
		msg:'点赞成功！！！'
	}
};
