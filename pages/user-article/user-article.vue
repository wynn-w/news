<template>
	<view class="user-article">
		<!-- #ifndef MP -->
		<view class="user-article__header">

			<view class="user-article__header__back" hover-class="el-hover" hover-stay-time="100" hover-start-time="0">
				<uni-icons type="back" size="26" color="#999" @click="back"></uni-icons>
			</view>

			<!-- <view class="user-article__header__add">
				<uni-icons type="plusempty" size="24" color="#999"></uni-icons>
			</view> -->
		</view>
		<!-- #endif -->
		<uni-load-more v-if="articleList.length === 0 && loading" status="loading" iconType="snow"></uni-load-more>
		<view class="">
			<list-item v-for="item in articleList" :key="item.id" :item="item" isSelf></list-item>
		</view>

		<view v-if="articleList.length <= 0 && !loading" class="no-data">
			当前还没发布过文章哦！
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user-article',
		data() {
			return {
				articleList: [],
				loading: true,
			};

		},
		methods: {
			formatParma(value) {
				// #ifdef MP
				const data = JSON.parse(value)
				//#endif

				//#ifdef H5
				const data = JSON.parse(decodeURIComponent(window.atob(value)))
				// #endif
				return data
			},
			back() {
				uni.switchTab({
					url: '/pages/tabBar/user/user'
				})
			},
			async isULogin(flag) {
				await this.$api.isULogin({ $store: this.$store, currentUrl: this.$mp.page.route })
			}
		},
		onLoad(options) {
			if(!options.id) return
			const id = this.formatParma(options.id)
			this.$api.getUserArticle({ userId: id }).then(res => {
				const { data } = res
				this.loading = false
				if (data.length === 0) {
					return
				}
				this.articleList = data;

			})
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #efeeee;
	}

	.user-article {
		height: 100%;
		display: flex;
		flex-direction: column;

		>.user-article__header {
			display: flex;
			flex-direction: row;
			// justify-content: space-around;
			align-items: center;
			padding: 20rpx;
			background-color: #f0f0f0;
			// box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2), -10px -10px 10px white;

			>.user-article__header__back,
			.user-article__header__add {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 16rpx;
				width: 122rpx;
				height: 72rpx;
				border: 1rpx solid #efeeee;

				box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.2), -4px -5px 10px #ffffff;
				// box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.2), -4px -5px 10px #ffffff;
			}
		}

		.no-data {
			// display: flex;
			flex: 1;
			// justify-content: center;
			// align-items: center;
			text-align: center;
			padding: 100rpx 0;
			color: #999;
			font-size: 30rpx;
		}
	}

	.el-hover {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
			0 0 0 rgba(255, 255, 255, 0.2),
			inset 20rpx 20rpx 20rpx rgba(0, 0, 0, 0.1),
			inset -20rpx -20rpx 20rpx rgba(255, 255, 255, 1) !important;
	}
</style>
