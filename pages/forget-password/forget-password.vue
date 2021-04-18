<template>
	<view class="forget-password">
		<!-- #ifdef H5 -->
		<view style="width: 1px;height: 20rpx;"></view>
		<view class="feedback__back" hover-class="back-hover" hover-stay-time="100" hover-start-time="0">
			<uni-icons type="back" size="26" color="#999" @click="back"></uni-icons>
		</view>
		<!-- #endif -->
		<view class="header">
			<view class="main__img-wrap">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="header__context" v-if="!flag">
				<h1>密码找回</h1>
				<text class="main__msg">请通过输入绑定邮箱，以重置帐号密码</text>
			</view>
			<view class="header__context" v-else>
				<h1>修改密码</h1>
				<text class="main__msg"> </text>
			</view>
		</view>
		<view class="body">
			<view class="login-page__main__form" v-if="!flag">
				<view class="form-cell">
					<view class="form-field">
						<view class="form-field__title">
							<text>邮箱</text><text class="error" v-if="emailErr !=''">{{`*`+emailErr}}</text>
						</view>
						<input-box ref="email" v-model="email" type="text" :verification="['isNull','isEmail']" :verificationTip="['邮箱不能为空','邮箱格式不正确']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field">
						<text class="form-field__title">验证码</text>
						<view class="form-field__container">
							<input-box class="form-field__container__input" ref="code" v-model="code" type="text" :verification="['isNull','code']" :verificationTip="['验证码不能为空','请输入6位有效验证码']" maTop="15" maBtm="15"></input-box>
							<view class="form-field__container__get-code" @click="sendEmail">
								{{time===''? '发送验证码':`${time}s 后获取`}}
							</view>
						</view>
					</view>
					<view class="form-field btn-control">
						<button class="submit_btn" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" size='mini' @click="submit">修改密码</button>
					</view>
				</view>
			</view>
			<view class="login-page__main__form" v-else>
				<view class="form-cell">
					<view class="form-field">
						<text class="form-field__title">新密码</text>
						<input-box ref="password" v-model="psw" type="password" :verification="['isNull','isPassword']" :verificationTip="['密码不能为空','密码由数字、字母和英文标点符号中至少两种组成，且长度在6-16位']" maTop="15" maBtm="15"></input-box>
					</view>
					<view class="form-field btn-control">
						<button class="submit_btn" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" size='mini' @click="resetPassword"></button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import inputBox from '@/components/input-box/input-box';
	export default {
		name: 'forget-password',
		components: {
			inputBox
		},
		computed: {
			resetEmailId: {
				get() {
					return uni.getStorageSync('resetEmailId') || ''
				},
				set(value) {
					uni.setStorageSync('resetEmailId', value)
				}
			}
		},
		data() {
			return {
				email: '',
				psw: '',
				// ip: '',  //tenxun
				time: '',
				code: '',
				emailErr: '',
				flag: false
			}
		},
		methods: {
			// todo: 点击之后，画面切换到密码输入环节()
			async resetPassword(res) {
				const password = this.$refs[`password`].getValue()
				if (!password) return
				let captcha1 = new TencentCaptcha('', (res) => {
					if (res.ret === 0) {
						this.$api.resetPassword({
							password: this.psw,
							email: this.email,
							resetEmailId: this.resetEmailId
						}).then(res => {
							if (res.code === 200) {
								uni.showToast({
									title: '密码修改成功，正在转跳登录页',
									icon: 'none'
								})
								uni.removeStorage({
								    key: 'resetEmailId'
								});
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login-page/login-page'
									})
								}, 1500)
							}
						}).catch(err => {

							uni.showToast({
								title: '验证失败，请重新获取验证码',
								icon: 'none'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/forget-password/forget-password'
								})
							}, 2000)

						})
					}
				});
				captcha1.show();
			},
			back() {
				uni.redirectTo({
					url: '/pages/login-page/login-page'
				})
			},
			jiaoyan() {
				if (!this.flag) {
					const email = this.$refs[`email`].getValue()
					const code = this.$refs[`code`].getValue()
					if (email && code) return true;
					return false
				}
				const password = this.$refs[`password`].getValue()
				if (password) return true;
				return false

			},
			async submit() {
				if (this.jiaoyan()) {
					// 1.校验验证码
					await this.$api.sendEmail({
							code: this.code,
							method: 'validateCode',
							email: this.email,
							codeId: this.resetEmailId,
							effectiveTime: 500
						})
						.then(res => {
							// 验证是失败时，promise 中断
							if (res.result.status == 1) {
								this.flag = true
								console.log('验证通过 ')
							} else if (res.result.status == 0) {
								uni.showToast({
									title: '验证码错误',
									icon: 'none'
								})
								console.log('验证码错误');
							} else {
								uni.showToast({
									title: '验证码失效',
									icon: 'none'
								})
								console.log('验证码失效');
							}
						}).catch(err => console.error(err))
				}
			},
			// 验证码获取
			async sendEmail() {
				// 计时未结束
				if (this.time != '') return
				const email = this.$refs[`email`].getValue()
				if (!email) return
				// 监听注册态 email账号 是否被占用
				await this.$api.hasEmail({
					email
				}).then(res => {
					console.log(res);
					if (this.emailErr == '') {
						this.emailErr = '当前邮箱未注册'
					}
					return new Promise((resolve, reject) => {})
				}).catch(async () => {
					if (this.emailErr != '') {
						this.emailErr = ''
					}
					await this.$api.sendEmail({
							serviceType: '163',
							method: 'sendCode',
							html: '验证码: #code#,有效时间:5分钟内.',
							email: this.email,
							subject: '密码重置验证码'
						})
						.then(res => {
							this.resetEmailId = res.result.id
							this.countdown()
							uni.showToast({
								title: '发送成功',
								icon: 'none'
							})
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
		},
		onLoad() {
			this.$api.getIp().then(res => this.ip = res.cip)
		}
	}
</script>

<style lang="scss">
	page {
		width: 100vw;
		height: 100vh;
	}

	.forget-password {
		background-color: #efeeee;
		width: 100%;
		height: 100%;
		padding: 0 24rpx;
		box-sizing: border-box;

		>.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 80rpx;

			>.main__img-wrap {
				width: 160rpx;
				height: 160rpx;
				margin-bottom: 48rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.header__context {
				display: flex;
				flex-direction: column;
				align-items: center;

				h1 {
					color: #555555;
				}

				.main__msg {
					margin-top: 22rpx;
					font-size: 28rpx;
					color: #8C92A4;
				}
			}
		}

		>.body {
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

	.feedback__back {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
		width: 122rpx;
		height: 72rpx;
		// margin-top: 20rpx;
		background-color: #f0f0f0;
		border: 1rpx solid #efeeee;
		box-shadow: 6rpx 10rpx 20rpx rgba(0, 0, 0, 0.2), -8rpx -10rpx 20rpx #ffffff;
		// 20rpx 20rpx 20rpx rgba(0, 0, 0, 0.2), -20rpx -20rpx 20rpx white;
	}

	.back-hover {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
			0 0 0 rgba(255, 255, 255, 0.2),
			inset 20rpx 20rpx 20rpx rgba(0, 0, 0, 0.1),
			inset -20rpx -20rpx 20rpx rgba(255, 255, 255, 1) !important;
	}

	.error {
		color: $base-color;
		font-size: 24rpx;
		margin-left: 10rpx;
	}
</style>
