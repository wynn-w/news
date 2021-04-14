'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	let { email } = event
	if (email == '') {
		return {
			code: 403,
			msg: '未输入邮箱账号  '
		}
	}
	const userInfoH5 = await db.collection('user')
		.where({
			email: email
		})
		.get();

	if (userInfoH5.data.length != 0) {
		return {
			code: 403,
			msg: '此邮箱已被注册'
		}
	}

	return {
		code: 200,
		msg: '当前 email 可用'
	}

}
