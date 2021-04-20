<template>
	<view class="news-feedback">
		<!-- #ifdef H5 -->
		<view class="feedback__back" hover-class="back-hover" hover-stay-time="100" hover-start-time="0">
			<uni-icons type="back" size="26" color="#999" @click="back"></uni-icons>
		</view>
		<!-- #endif -->
		<view class="feedback__container">
			<view class="feedback-title">意见反馈：</view>
			<view class="feedback-content">
				<!-- 云开发实现 -->
				<textarea class="feedback-textarea" v-model="content" :style="{boxShadow:textareaStyle.boxShadow}" bindfocus="addFocus" bindblur="deteleFocus" @focus="addFocus" @blur="deteleFocus" placeholder="请输入您要反馈的问题"></textarea>
			</view>
			<view class="feedback-title">反馈图片:</view>
			<view class="feedback-image-box">
				<!-- <view class="feedback-image-item" v-for="(item,index) in imageList" :key="index"> -->
				<view class="feedback-image-item" v-for="(item,index) in imageList" :key="index">
					<view class="close-icon" @click="deteleImage(index)">
						<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
					</view>
					<view class="image-box">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
				</view>
				<view class="feedback-image-item" v-if="imageList.length<5" @click="addImage">
					<!-- <view class="feedback-image-item"> -->
					<view class="image-box">
						<uni-icons type="plusempty" size="50" color="#ffffff"></uni-icons>
					</view>
				</view>
			</view>
			<button class="feedback_btn" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" @click="submit"> 提交反馈</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'feedback',
		computed: {
			...mapGetters(['GET_USER_INFO'])
		},
		data() {
			return {
				imageList: [],
				maxLength: 5,
				feedBackImages: [],
				content: '',
				textareaStyle: {},
				aa: []
			}
		},
		methods: {
			/**
			 * textarea 样式处理
			 * */
			addFocus() {
				if (Object.keys(this.textareaStyle).length !== 0) return
				this.textareaStyle = {
					'boxShadow': 'inset 4rpx 10rpx 10rpx #babecc, inset -10rpx -10rpx 20rpx #FFFFFF'
				}
			},
			deteleFocus() {
				if (Object.keys(this.textareaStyle).length == 0) return
				this.textareaStyle = {}
			},

			/**
			 * 反馈图片逻辑
			 * */
			deteleImage(index) {
				this.imageList.splice(index, 1)
			},
			addImage() {
				const nowCount = this.maxLength - this.imageList.length
				uni.chooseImage({
					count: nowCount,
					success: (res) => {
						const { tempFilePaths, tempFiles } = res
						for (let i = 0; i < tempFilePaths.length; i++) {
							// H5图片多选处理：超出不处理
							if (i < nowCount) {
								// let image = tempFilePaths[i]
								let image = {
									url: tempFilePaths[i],

									// #ifdef H5
									name: tempFiles[i].name,
									// #endif

									// #ifdef MP
									name: tempFiles[i].path,
									// #endif
								}
								this.imageList.push(image)
							} else break
						}
					}
				})
			},

			/**
			 * 上传
			 * */
			async submit() {
				if (!this.GET_USER_INFO._id) {
					await this.isULogin()
					if (!this.GET_USER_INFO._id) return
				}
				if (!this.content) {
					uni.showToast({
						title: '请输入反馈内容!',
						icon: 'none'
					})
					return
				}
				uni.showLoading();
				let imagePath = []
				for (let image of this.imageList) {
					const path = await this.uploadFiles(image)
					imagePath.push(path)
				}
				this.updateFeedBack({
					content: this.content,
					feedbackImages: imagePath
				})
				uni.hideLoading();
			},
			// 上传并获取文件云存储的id
			async uploadFiles(arg) {
				const { url, name } = arg
				const result = await uniCloud.uploadFile({
					filePath: url,
					cloudPath: `/feedback/img/${name}`
				}).catch(err => {
					uni.hideLoading()
				})
				return result.fileID;
			},
			// 存储到表
			updateFeedBack(arg) {
				const { content, feedbackImages } = arg
				this.$api.updateFeedback({
					userId: this.GET_USER_INFO._id,
					content,
					feedbackImages
				}).then(res => {
					if (res.code !== 200) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						return
					}
					uni.showToast({
						title: '反馈提交成功!',
						icon: 'none'
					})
					// $nextTick 环境下不显示 toast
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabBar/user/user'
						})
					}, 1500)

				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: '反馈提交失败!',
						icon: 'none'
					})
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/tabBar/user/user'
				})
			},
			async isULogin(flag) {
				await this.$api.isULogin({ $store: this.$store, currentUrl: this.$mp.page.route })
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #efeeee;
	}

	.news-feedback {
		.feedback__back {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 16rpx;
			width: 122rpx;
			height: 72rpx;
			margin: 20rpx;
			background-color: #f0f0f0;
			border: 1rpx solid #efeeee;
			box-shadow: 6rpx 10rpx 20rpx rgba(0, 0, 0, 0.2), -8rpx -10rpx 20rpx #ffffff;
			// 20rpx 20rpx 20rpx rgba(0, 0, 0, 0.2), -20rpx -20rpx 20rpx white;
		}

		.feedback__container {
			border-radius: 16rpx;
			margin: 40rpx 20rpx;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #f0f0f0;
			box-shadow: 2rpx 2rpx 4rpx #babecc, -2rpx -2rpx 4rpx #FFFFFF;
		}

		.feedback-title {
			margin: 30rpx;
			font-size: 27rpx;
			margin-bottom: 0;
			color: #666;
		}

		.feedback-content {
			margin: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;

			.feedback-textarea {
				outline: none;
				min-width: 200rpx;
				padding: 30rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				background-color: #f0f0f0;
				box-shadow: inset 2rpx 2rpx 4rpx #babecc, inset -2rpx -2rpx 4rpx #FFFFFF;
				color: #666666;
				font-size: 24rpx;
				width: 100%;
				height: 200rpx;
			}
		}

		.close-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 24rpx;
			height: 24rpx;
			border-radius: 50%;
			background-color: #ff5a5f;
			z-index: 2;
		}

		.feedback-image-box {
			display: flex;
			flex-wrap: wrap;
			margin: 30rpx;
			padding: 20rpx;
			border-radius: 16rpx;
			box-shadow: inset 2rpx 2rpx 4rpx #babecc, inset -2rpx -2rpx 4rpx #FFFFFF;

			.feedback-image-item {
				width: 33.33%;
				position: relative;
				height: 0;
				padding-top: 33.33%;
				box-sizing: border-box;

				.image-box {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					bottom: 10rpx;
					left: 10rpx;
					border: 2rpx #eee solid;
					border-radius: 10rpx;
					overflow: hidden;
					box-shadow: 2rpx 2rpx 4rpx #babecc, -4rpx -4rpx 8rpx #FFF;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.feedback_btn {
			margin: 0 40rpx;
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

		.back-hover {
			box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
				0 0 0 rgba(255, 255, 255, 0.2),
				inset 20rpx 20rpx 20rpx rgba(0, 0, 0, 0.1),
				inset -20rpx -20rpx 20rpx rgba(255, 255, 255, 1) !important;
		}
	}
</style>
