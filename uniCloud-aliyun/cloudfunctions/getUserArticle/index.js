'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd= db.command
exports.main = async (event, context) => {
	const {
		userId
	} = event;
	if(!userId){
		return {
			code:401,
			msg:'非法操作'
		}
	}
	let userInfo=await db.collection('user').doc(userId).get();
	userInfo= userInfo.data[0]
	
	let lists= await db.collection('article').aggregate()
					.match({
						id:dbCmd.in(userInfo.article_ids)
					}).end()

	//返回数据给客户端
	return {
		code:200,
		msg:'请求数据成功',
		data:lists.data
	}
};
