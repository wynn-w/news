<template>
	<view class="login-page">
		<view class="login-page__header ">
			<view class="login-page__header__title">
				<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
				<text>{{toLogin ?'登录':'注册'}}</text>
			</view>
			<view class="login-page__header__other" v-if="toLogin">
				<text>没有帐号，</text>
				<text @click="changeTo">点击注册</text>
			</view>
			<view class="login-page__header__other" v-else>
				<text>已有帐号，</text>
				<text @click="changeTo">点击登录</text>
			</view>
		</view>
		<view class="login-page__main">
			<view class="login-page__main__form">
				<view class="form-cell" v-if="toLogin">
					<view class="form-field">
						<text class="form-field__title">邮箱</text>
						<input-box ref="loginEmail" v-model="login.email" key="loginemail" type="text" :verification="['isNull','isEmail']" :verificationTip="['密码不能为空','邮箱格式不正确']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field">
						<text class="form-field__title">密码</text>
						<input-box ref="loginPassword" v-model="login.psw" key="loginpassword" type="password" :verification="['isNull','code']" :verificationTip="['密码不能为空','密码由数字、字母和英文标点符号中至少两种组成，且长度在6-16位']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field btn-control">
						<button class="submit_btn" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" size='mini' @click="loginSubmit">登录</button>
						<text class="forgetPsw" @click="forgetPsw">
							忘记密码
						</text>
					</view>
				</view>

				<view class="form-cell" v-else>
					<view class="form-field">
						<text class="form-field__title">用户名</text>
						<input-box ref="singupName" v-model="singup.name" key="singupname" type="text" :verification="['isNull','name']" :verificationTip="['用户名不能为空','用户名由 4 ~ 10 位字符组成']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field">
						<view class="form-field__title">

							<text>邮箱</text><text class="error" v-if="emailErr !=''">{{`*`+emailErr}}</text>
						</view>
						<input-box ref="singupEmail" v-model="singup.email" key="singupemail" type="text" :verification="['isNull','isEmail']" :verificationTip="['邮箱不能为空','邮箱格式不正确']" maTop="15" maBtm="15"></input-box>

					</view>
					<view class="form-field">
						<text class="form-field__title">验证码</text>
						<view class="form-field__container">
							<input-box class="form-field__container__input" ref="singupCode" v-model="code" type="text" :verification="['isNull','code']" :verificationTip="['验证码不能为空','请输入6位有效验证码']" maTop="15" maBtm="15"></input-box>
							<view class="form-field__container__get-code" @click="sendEmail">
								{{time===''? '发送验证码':`${time}s 后获取`}}
							</view>
						</view>

					</view>
					<view class="form-field">
						<text class="form-field__title">密码</text>
						<input-box ref="singupPassword" v-model="singup.psw" type="password" :verification="['isNull','isPassword']" :verificationTip="['密码不能为空','密码由数字、字母和英文标点符号中至少两种组成，且长度在6-16位']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field btn-control">
						<button class="submit_btn" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" size='mini' @click="singupSubmit">注册</button>
					</view>
				</view>
			</view>
		</view>
		<view class="login-page__footer" v-if="false">
			<text>其他方式登录</text>
			<view class="login-page__footer__other-login">
				<view class="login-page__footer__other-login-item" v-for="(item,index) in 5" :key="index">
					<image src="/static/logo.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import inputBox from '@/components/input-box/input-box';
	export default {
		name: 'login-page',
		components: {
			inputBox
		},
		computed: {
			emailId: {
				get() {
					return uni.getStorageSync('emailId') || ''
				},
				set(value) {
					uni.setStorageSync('emailId', value)
				}
			}
		},
		data() {
			return {
				// 登录输入框内容
				login: {
					email: null,
					psw: null
				},
				// 注册输入框内容
				singup: {
					name: null,
					email: null,
					psw: null
				},
				toLogin: true,
				time: '',
				code: '',
				emailErr: '',
				lastPage: 'pages/tabBar/user/user'
			}
		},
		methods: {
			// 数据校验
			jiaoyan() {
				const singup = `singup`,
					login = `login`
				let obj = {
					name: 'Name',
					email: 'Email',
					code: 'Code',
					password: 'Password'
				}
				let flag = true
				let objValue = Object.values(obj)
				// 登录页
				if (this.toLogin) {

					for (let i = 0; i < objValue.length; i++) {
						if (objValue[i] == 'Name') continue
						if (objValue[i] == 'Code') continue
						if (!this.$refs[`${login}${objValue[i]}`].getValue()) {
							flag = false
						}
					}
					return flag
				}
				// 注册页
				flag = Array.from(Object.values(obj)).every(value =>
					this.$refs[`${singup}${value}`].getValue() !== '' || false
				)

				// 注册页 code
				this.$refs[`singupCode`].getValue() == '' && (flag = false)
				return flag
			},
			async loginSubmit() {
				if (!this.jiaoyan()) return;
				let captcha1 = new TencentCaptcha('', async (res) => {
					if (res.ret === 0) {

						await this.$store.dispatch('h5').then(res => {
							res.h5Login({
								login: this.login,
								lastPage: this.lastPage
							})

						})
					}
				})

			},
			async singupSubmit() {
				if (!this.jiaoyan()) return
				let captcha1 = new TencentCaptcha('', async (res) => {
					if (res.ret === 0) {
						// 1.校验验证码
						await this.$api.sendEmail({
								code: this.code,
								method: 'validateCode',
								email: this.singup.email,
								codeId: this.emailId,
								effectiveTime: 500
							})
							.then(res => {
								// 验证是失败时，promise 中断
								if (res.result.status == 1) {
									console.log('验证通过 ')
								} else if (res.result.status == 0) {
									uni.showToast({
										title: '验证码错误',
										icon: 'none'
									})
									console.log('验证码错误');
									return new Promise((resolve, reject) => {})
								} else {
									uni.showToast({
										title: '验证码失效',
										icon: 'none'
									})
									console.log('验证码失效');
									return new Promise((resolve, reject) => {})
								}
							})
							// 注册逻辑
							.then(async () => {
								let copy = JSON.parse(JSON.stringify(this.singup))
								copy.platform = 'H5-EMAIL'
								copy.type = 'singup'
								let data = copy
								await this.$store.dispatch('h5').then(res => {
									res.h5Register(data)
									// .then(res => console.log(res))
								})
							})
					}
				})
				captcha1.show();


			},

			changeTo() {
				this.toLogin = !this.toLogin
			},
			// 验证码获取
			async sendEmail() {
				// 计时未结束
				if (this.time != '') return
				const email = this.$refs[`singupEmail`].getValue()
				if (!email) return
				// 监听注册态 email账号 是否被占用
				await this.$api.hasEmail({
					email
				}).then(res => {
					if (this.emailErr != '') {
						this.emailErr = ''
					}

				}).catch(err => {
					this.emailErr = err.msg
					return new Promise((resolve, reject) => {})
				}).then(async () => {
					// 验证码发送
					await this.$api.sendEmail({
							serviceType: '163',
							method: 'sendCode',
							html: '验证码: #code#,有效时间:5分钟内.',
							email: this.singup.email,
							subject: '注册验证码'
						})
						.then(res => {
							this.emailId = res.result.id
							uni.showToast({
								title: '发送成功',
								icon: 'none'
							})
							this.countdown()
						}).catch(err => console.log(err))
				})

			},
			// 验证码 倒计时
			countdown() {
				let n = 60;
				let timer;
				if (n > 0) {
					timer = setInterval(() => {
						n--;
						this.time = n
						if (n <= 0) {
							this.time = ''
							clearInterval(timer)
						}
					}, 1000)
				}

			},
			forgetPsw() {
				uni.navigateTo({
					url: '/pages/forget-password/forget-password'
				})
			}


		},
		onLoad(option) {
			if (option.page) {
				this.lastPage = JSON.parse(decodeURIComponent(window.atob(option.page)))
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: #efeeee;
	}

	.login-page {
		padding-top: 80rpx;
		display: flex;
		flex-direction: column;
		width: 100%;

		>.login-page__header {
			padding: 24rpx;
			margin: 16rpx;
			border-radius: 12rpx;
			color: #666;
			font-weight: 500;
			display: flex;
			flex-direction: row;
			align-items: center;

			& text {
				font-size: 30rpx;
			}

			.login-page__header__title {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-right: auto;
				color: #555;

				.logo {
					width: 75rpx;
					height: 75rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				text {

					font-size: 70rpx;
					font-weight: bold;
				}
			}

			.login-page__header__other {
				text:last-child {
					color: #6f95a8;
				}
			}
		}


		>.login-page__main {
			padding: 24rpx;
			margin-top: 40rpx;

			.login-page__main__form {
				.form-field {
					.form-field__title {
						color: #555;
						display: flex;
						flex-direction: row;
						align-items: center;
					}



					.form-field__container {
						width: 100%;
						display: flex;
						flex-direction: row;
						justify-content: center;
						box-sizing: border-box;

						.form-field__container__input {
							flex: 1;
						}

						.form-field__container__get-code {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 30%;
							color: #6f95a8
						}
					}

					.submit_btn {
						margin: 0;
						color: #666;
						background-color: $base-color;
						box-shadow: 3px 5px 10px #c79a97, -4px -5px 10px #ffffff;

					}

					.el-hover {
						opacity: 0.9;
						box-shadow: 0 0 0 #e7a0a0,
							0 0 0 #ffb4ab,
							inset 20rpx 20rpx 10rpx #e7a0a0,
							inset -20rpx -20rpx 10rpx #ffb4ab !important;
					}

					&.btn-control {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-top: 40rpx;

						.forgetPsw {
							color: #6f95a8;
							font-size: 24rpx;
						}
					}
				}
			}

		}

		>.login-page__footer {
			padding: 10px;
			margin: 80rpx 12rpx;
			border-radius: 5px;
			color: #666;
			font-size: 30rpx;

			.login-page__footer__other-login {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.login-page__footer__other-login-item {
					width: 100rpx;
					height: 100rpx;

					margin: 20rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}

					&:first-child {
						margin-left: 0;
					}

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}

	}

	.error {
		color: $base-color;
		font-size: 24rpx;
		margin-left: 10rpx;
	}
</style>
