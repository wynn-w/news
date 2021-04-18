'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const { email, password, resetEmailId } = event //validetor

	if (!email || !password || !resetEmailId) {
		return {
			code: 401,
			msg: '非法操作'
		}
	}
	// 校验是否存在重置邮件且已验证
	const emailCheck = await db.collection('emailCode').where({
		_id: resetEmailId,
		validate: 1
	}).field({
		timestamp: true
	}).get()
	if (emailCheck.data.length !== 1) {
		return {
			code: 401,
			msg: '非法操作'
		}
	}
	const timestamp = emailCheck.data[0].timestamp
	const now = Date.now()
	if ((now - timestamp) > 500000) {
		return {
			code: 403,
			msg: '验证码超时'
		}
	}

	let user = await db.collection('userLogin').where({
		email: email
	}).field({
		_id: true,
	}).get()
	user = user.data[0]._id
	// 修改密码
	await db.collection('userLogin').doc(user).update({
		password: password
	})
	return {
		code: 200,
		msg: '密码修改成功'
	}
};
