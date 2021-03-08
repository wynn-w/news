'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let label = await db.collection('label').get()
	// 这里是否添加校验，响应请求失败及其返回
	return {
		code: 200,
		msg: "请求成功",
		data: label.data
	}
};
