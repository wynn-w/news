'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	let {
		platform = 'MP-WEIXIN', // 平台标识 `MP(WEIXIN)`/`H5(EMAIL)`
			name = '', //邮箱注册情况下
			email = '',
			psw: password,
			type = 'login', //h5专有，表示登录(login)/注册(singup)
			// 
			avatarUrl =
			'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fdd22c73-7342-47b0-b0fb-b5c169c7e1ce/8f15feac-3db6-435e-9e1b-e22f34f360ca.jpg',
			gender = 1,
			nickName = '',
			openId = '',

	} = event
	// 小程序
	if (/^MP/.test(platform)) {
		if (openId == '') {
			return {
				code: 403,
				msg: '非法操作'
			}
		}
		// WEIXIN
		const userInfo = await db.collection('user')
			.where({
				open_id: openId
			})
			.get();

		if (userInfo.data.length != 0) {
			return {
				code: 201,
				msg: '用户已存在111',
				data: userInfo.data

			}
		}
		// OTHER
	}
	// h5
	if (/^H5/.test(platform)) {
		if (email == '') {
			return {
				code: 403,
				msg: '非法操作'
			}
		}
		// EMAIL
		// 校验表中是否存在 当前邮箱是否存在
		const userInfoH5 = await db.collection('userLogin')
			.where({
				email: email,
			})
			.get();
		let length = userInfoH5.data.length

		// 登录
		if (type === 'login') {
			if (length === 1) {
				const { id, password: kpsw } = userInfoH5.data[0]
				// 密码检测
				if (password == kpsw) {
					const user = await db.collection('user').aggregate()
						.match({ id: id }).end()
					return {
						code: 200,
						msg: '登录成功',
						data: user.data[0]
					}
				}
				return {
					code: 403,
					msg: '账号或密码错误'
				}

			}
			return {
				code: 403,
				msg: '账号或密码错误'
			}
		}
		// 注册
		if (length != 0) {
			return {
				code: 201,
				msg: '用户已存在'
			}
		}
		// OTHER
	}

	gender = gender === 1 ? '男' : '女'
	// 邮箱注册条件下没有 nickName
	if (nickName === '' || undefined) {
		nickName = name
	}
	const id = genID(13) //用户唯一标识符
	await db.collection('userLogin').add({
		id: id,
		nickName: nickName,
		password: password || '',
		email: email || ''
	})
	const res = await db.collection('user').add({
		avatar: avatarUrl,
		gender: gender,
		author_name: nickName,
		open_id: openId,
		article_ids: [],
		article_likes_ids: [],
		author_likes_ids: [],
		explain: '',
		id: id,
		integral_count: '',
		professional: '',
		fans_count: 0,
		follow_count: 0,
		thumbs_up_article_ids: [],
		email: email
	})

	return {
		code: 200,
		msg: '用户注册成功',
		data: res
	}
};

function genID(length) {
	return Date.now().toString().substring(3, length + 3)
} 