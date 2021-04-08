<template>
	<view class="login" @click="authHandle">
		<slot></slot>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name:'login',
		computed: {
			...mapGetters(['GET_LOGIN', 'GET_AUTH', 'GET_OPENID', 'GET_USER_INFO']),
			openId: {
				get() {
					return this.GET_OPENID
				},
				set(value) {
					this.$store.commit('setOpenId', value)
				}
			},
			login: {
				get() {
					return this.GET_LOGIN
				},
				set(value) {
					this.$store.commit('setLogin', value)
				}
			},
			auth: {
				get() {
					return this.GET_AUTH
				},
				set(value) {
					this.$store.commit('setAuth', value)
				}
			},
			_userInfo: {
				get() {
					return this.GET_USER_INFO
				},
				set(value) {
					this.$store.commit('setUserInfo', value)
				}
			}
		},
		data() {
			return {
				userInfo: {},
				code: '',
				secretId: '', // 小程序 secretId
				appId: '' // 小程序 appId
			};
		},
		methods: {
			async authHandle() {
				// #ifdef MP-WEIXIN
				await this.wxAuth()
				// #endif
				// #ifdef H5
				console.log('H5');
				// #endif
			},
			async wxAuth() {
				// 已授权
				if (this.auth) {
					await this.wxRegister()
					return
				}
				// 未授权
				await wx.getUserProfile({
					lang: "zh_CN",
					desc: "注册"
				}).then(async res => {
					const { avatarUrl, gender, language, nickName } = res.userInfo
					this.userInfo = {
						avatarUrl,
						gender,
						language,
						nickName
					}
					this.$store.commit('setAuth', true)
					await this.wxRegister()
				}).catch(err => {
					uni.showModal({
						title: '提示',
						content: '授权开启更多功能',
						success: (res) => {
							if (res.confirm) {
								this.wxAuth()
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
				})

			},
			async wxRegister() {
				if (this.GET_OPENID != '' && this._userInfo._id) {
					await this.$store.dispatch('asyncgetUserInfo', { userId })
					return uni.navigateBack()
				}
				/**
				 * 本地 openId 不存在
				 * */
				await uni.login({
					provider: "weixin"
				}).then(res => {
					this.code = res[1].code
				})

				// 获取openId => 登录注册逻辑都在一起了
				await uni.request({
					url: `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.secretId}&js_code=${this.code}&grant_type=authorization_code`
				}).then(res => {
					const openId = res[1].data.openid
					let old = this.userInfo
					old.openId = openId
					this.userInfo = Object.assign({}, this.userInfo, old)
					this.openId = openId

					this.$api.addUser(this.userInfo).then(res => {
						// 注册
						const { data } = res
						userId = data.id
						this.$store.dispatch('asyncgetUserInfo', { userId })
						return uni.navigateBack()

					}).catch(err => {
						// 登录
						if (err.code === 201) {
							let user = {}
							user.data = err.data[0]
							this._userInfo = user
							this.auth = true
							this.login = true
							
						}
					})
				})
			}

		},
	}
</script>
