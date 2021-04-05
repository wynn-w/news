<template>
	<view class="news-user">
		<view class="user__header">

			<view class="user__header__avatar">
				<view class="user__header__avatar-box" hover-class="el-hover" hover-stay-time="100" hover-start-time="0">
					<!-- <image :src="GET_USER_INFO.avatar" mode="aspectFill"></image> -->
					<image src="@/static/logo.png" mode="aspectFill"></image>
				</view>
				<text class="user__header__name">{{GET_USER_INFO.author_name}}</text>
			</view>

			<view class="user__header__info">
				<view class="user__header__info-box">
					<text class="user__header__info-title">关注</text>
					<text>{{GET_USER_INFO.follow_count || 0}}</text>
				</view>
				<view class="user__header__info-box">
					<text class="user__header__info-title">粉丝</text>
					<text>{{GET_USER_INFO.fans_count|| 0}}</text>
				</view>
				<view class="user__header__info-box">
					<text class="user__header__info-title">积分</text>
					<text>{{GET_USER_INFO.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<view class="user__content">
			<view class="user__content__list" hover-class="el-hover" hover-stay-time="100" hover-start-time="0"  @click="openActicleList">
				<view class="user__content__list-title">
					<uni-icons class="icons" type="contact" size="16" color="#999"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#999"></uni-icons>
			</view>
			<view class="user__content__list" hover-class="el-hover" hover-stay-time="100" hover-start-time="0" @click="openFeedback">
				<view class="user__content__list-title">
					<uni-icons class="icons" type="help" size="16" color="#999"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#999" ></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name:"news-user",
		computed: {
			...mapGetters(['GET_USER_INFO'])
		},
		methods: {
			openActicleList() {
				// #ifdef MP
				let id = JSON.stringify(this.GET_USER_INFO._id)
				// #endif
				// #ifdef H5
				 let id = window.btoa(encodeURIComponent(JSON.stringify(this.GET_USER_INFO.id)))
				// #endif
				uni.navigateTo({
					url: `/pages/user-article/user-article?id=${id}`
				})
			},
			openFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback'
				})
			}
		},
		async mounted() {
			await this.$store.dispatch('asyncgetUserInfo')
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #efeeee;
	}

	.news-user {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;

		.user__header {
			padding: 15px;
			margin: 10px;
			border-radius: 8px;
			color: #666;
			font-weight: 500;
			font-size: 14px;

			.user__header__avatar {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 30px;

				.user__header__avatar-box {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					overflow: hidden;
					padding: 10px;
					background-color: #f0f0f0;
					box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2), -10px -10px 10px white;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.user__header__name {
					margin-top: 15px;
					font-size: 16px;
					height: 16px;
					line-height: 1;
					font-weight: bold;
					color: #666;
				}


			}

			.user__header__info {
				margin-top: 15px;
				display: flex;

				.user__header__info-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					font-size: 12px;
					color: #999;

					.user__header__info-title {
						font-size: 14px;
						color: #666;
					}
				}
			}


		}

		.user__content {
			flex: 1;


			.user__content__list {
				display: flex;
				justify-content: space-between;
				padding: 15px;
				margin-bottom: 10px;
				align-items: center;
				padding: 12px;
				margin: 20px 10px;
				border-radius: 8px;
				border: 1px solid #f5f5f5;
				background-color: #f0f0f0;
				color: #666;
				font-weight: 500;
				font-size: 14px;
				box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2), -10px -10px 10px white;

				.user__content__list-title {
					display: flex;
					align-items: center;
					.icons {
						margin-right: 5px;
					}
				}


			}
		}


	}

	.el-hover {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
			0 0 0 rgba(255, 255, 255, 0.2),
			inset 10px 10px 10px rgba(0, 0, 0, 0.1),
			inset -10px -10px 10px rgba(255, 255, 255, 1) !important;
	}
</style>
