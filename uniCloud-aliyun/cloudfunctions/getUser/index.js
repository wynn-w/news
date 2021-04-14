'use strict';
const db= uniCloud.database()
exports.main = async (event, context) => {	
	const{
		userId
	}=event
	
	if(!userId){
		return {
			code:201,
			msg:'获取数据失败',
		}
	}
	
	const userInfo= await db.collection('user').doc(userId).get()
	
	//返回数据给客户端
	return {
		code:200,
		msg:'获取数据成功',
		data:userInfo.data[0]
	}
};
