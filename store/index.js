import Vue from 'vue'
import Vuex from 'vuex'
import $api from "../common/api/index.js"

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		labelList: new Array(), //home -> tab
		articleList: new Array(), //home -> list
		index: 0, // home -> tab/list 下标
		load: {}, // home -> list -> list-item  记录每个 list-item 的页数与 load-more 组件状态
		input: '', // home-search 
		searchList: new Array(), // home-search ==> 是否用 set 替换
		searchHistory: uni.getStorageSync("__history") || [], // home-search 
		// 用户信息
		userInfo: uni.getStorageSync("userInfo") || {},
		isLogin: uni.getStorageSync("isLogin") || false,
		isAuth: uni.getStorageSync("isAuth") || false,
		openId: uni.getStorageSync("openId") || false,
	},
	getters: {
		GET_LABEL(state) {
			return state.labelList
		},
		GET_ARTICLE(state) {
			return state.articleList
		},
		GET_INDEX(state) {
			return state.index
		},
		GET_LOAD(state) {
			return state.load
		},
		GET_INPUT(state) {
			return state.input
		},
		GET_SEARCH_LIST(state) {
			return state.searchList
		},
		GET_SEARCH_HISTORY(state) {
			return state.searchHistory
		},
		GET_USER_INFO(state) {
			return state.userInfo
		},
		GET_LOGIN(state) {
			return state.isLogin
		},
		GET_AUTH(state) {
			return state.isAuth
		},
		GET_OPENID(state) {
			return state.openId
		}
	},
	mutations: {
		setLabel(state, value) {
			state.labelList = value
		},
		setArticle(state, args) {
			const { data, index, isRefresh } = args
			if (!isRefresh) {
				let old = state.articleList[index] || []
				old.push(...data)
				Vue.set(state.articleList, index, old)
				return
			}
			old.push(...data)
			let old = state.articleList[index]
			Vue.set(state.articleList, index, data)
		},
		setIndex(state, value) {
			state.index = value
		},
		setLoad(state, arg) {
			const { index, load } = arg
			Vue.set(state.load, index, load)
		},
		setInput(state, value) {
			state.input = value
		},
		setSearchList(state, arg) {
			state.searchList = arg.data
		},
		setSearchHistory(state, value) {

			// 对于已有的几率，将其提前到首位；最大长度为 20

			let arr = state.searchHistory
			const index = arr.indexOf(value)

			if (index > 0) {
				arr.splice(index, 1)
			}
			if (arr.length > 19) {
				arr.pop()
			}
			arr.unshift(value)
			uni.setStorageSync('__history', arr)
		},
		// 删除所有搜索历史
		clearHistory(state) {
			uni.removeStorageSync('__history')
			state.searchHistory = []
		},
		// 删除指定搜索记录
		deleteHistory(state, name) {
			let arr = state.searchHistory
			const index = arr.indexOf(name)
			if (index < 0) {
				return console.error(`搜索记录 ‘${name}’ 不存在`)
			}
			arr.splice(index, 1)
			uni.setStorageSync('__history', arr)
		},
		setUserInfo(state, user) {
			// state.userInfo = JSON.parse(user.data)
			state.userInfo = user.data
			uni.setStorageSync('userInfo', state.userInfo)
		},
		setLogin(state, value) {

			state.isLogin = value
			uni.setStorageSync('isLogin', state.isLogin)
			// dispatch('setAuth', true) // 不可行
		},
		setAuth(state, value) {
			state.isAuth = value
			uni.setStorageSync('isAuth', state.isAuth)
		},
		setOpenId(state, value) {
			state.openId = value
			uni.setStorageSync('openId', state.openId)
		},
	},
	actions: {
		async asyncLabel({ commit }, arg) {
			$api.getLabel()
				.then(res => {
					let { data } = res
					data.unshift({ name: '全部' })
					commit('setLabel', data)
				})
				.catch(err => console.error(err))

		},
		async asyncArticle({ commit }, arg) {
			let { name, index = 0, page, pageSize, isRefresh = false } = arg
			let props = {},
				code
			if (name) { props = { name, page, pageSize } }
			await $api.getArticleList(props)
				.then(res => {
					const { data } = res
					code = res.code
					// data 无数据说明请求到底，改 loadmore 组件状态 为“无更多数据”
					if (data.length !== 0) {
						
						commit('setArticle', { data, index, isRefresh })
						return
					}
					const load = { loading: 'onMore', page: page }
					commit('setLoad', { index, load })
				})
				.catch(err => console.error(err))
			return new Promise((reslove, reject) => {
				reslove({ code })
			})
		},
		async asyncSearchList({ commit }, arg) {
			let isNull = false
			await $api.getSearch(arg)
				.then(res => {
					const { data } = res
					commit('setSearchList', { data })
					if (data.length === 0) isNull = true
				})
				.catch(err => console.error(err))
			return new Promise((reslove, reject) => {
				reslove({ isNull })
			})
		},
		async asyncgetUserInfo({ commit }, arg) {
			await $api.getUserInfo(arg)
				.then(res => {
					const { data } = res
					if (res.code === 201) {
						return res.msg
					}
					commit('setUserInfo', { data })
				})
				.catch(err => console.error(err))
			// return new Promise((reslove, reject) => {
			// 	reslove({ isNull })
			// })
		},
		changeAuth({ commit }, value) {
			commit('setAuth', value)
		},
		// 微信登录注册逻辑
		async wx({ commit, dispatch, state }, arg) {
			let auth = state.isAuth
			let userInfo = {} //临时存储微信返回的用户信息
			// this 指向 store
			let wxAuth = async () => {
				// 已授权
				if (auth) {
					await wxRegister()
					return
				}
				// 未授权
				await wx.getUserProfile({
					lang: "zh_CN",
					desc: "注册"
				})
				.then(async res => {
					const { avatarUrl, gender, language, nickName } = res.userInfo
					userInfo = {
						avatarUrl,
						gender,
						language,
						nickName
					}
					commit('setAuth', true)
					await wxRegister(userInfo)
				}).catch(err => {
					uni.showModal({
						title: '提示',
						content: '授权开启更多功能',
						success: (res) => {
							if (res.confirm) {
								wxAuth()
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
				})
			}
			let wxRegister = async (userInfo) => {
				let openId = state.openId
				let code = ''
				const secretId = '' // 小程序 secretId
				const appId = '' // 小程序 appId

				if (openId != '' && userInfo._id) {
					await dispatch('asyncgetUserInfo', { userId: userInfo._id })
					return uni.navigateBack()
				}
				/**
				 * 本地 openId 不存在
				 * */
				await uni.login({
					provider: "weixin"
				}).then(res => {
					code = res[1].code
				})
				// 获取openId => 登录注册逻辑都在一起了
				await uni.request({
					url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secretId}&js_code=${code}&grant_type=authorization_code`
				}).then(res => {
					const openId = res[1].data.openid
					commit('setOpenId', openId)
					let old = userInfo
					old.openId = openId

					userInfo = Object.assign({}, userInfo, old)

					$api.addUser(userInfo).then(res => {
						// 注册
						const { data } = res
						userId = data.id
						dispatch('asyncgetUserInfo', { userId })
						return uni.navigateBack()

					}).catch(err => {
						// 登录
						if (err.code === 201) {
							let user = {}
							user.data = err.data[0]
							commit('setUserInfo', user)
							commit('setLogin', true)
							commit('setAuth', true)

						}
					})
				})
			}
			return {
				wxAuth,
				wxRegister
			}
		},
		async h5({ commit, dispatch, state }, arg) {
			let h5Login = async (data) => {
				const { login, lastPage } = data
				$api.addUser({
						email: login.email,
						psw: login.psw,
						platform: "H5-EMAIL"
					}).then(res => {

						let data = {}
						data.data = res.data
						commit('setUserInfo', data)
						commit('setLogin', true)
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						setTimeout(() => {
							if (/^pages\/tabBar/.test(lastPage)) {
								uni.switchTab({
									url: `/${lastPage}`
								});
							} else {
								uni.redirectTo({
									url: `/${lastPage}`
								});
							}

						}, 1000)
					})
					.catch(err => {
						uni.showToast({
							title: err.msg,
							icon: 'none'
						})
						console.error(err);
					})

			}
			let h5Register = async (singup) => {
				$api.addUser(singup).then(res => {
					// 注册
					const { data } = res
					const userId = data.id
					dispatch('asyncgetUserInfo', { userId })
					console.log('注册成功');
					return uni.navigateBack()
				})

			}
			return {
				h5Login,
				h5Register
			}
		}
	}

});
