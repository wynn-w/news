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
			}
		},
		onLoad(options) {
			const id = this.formatParma(options.id)
			this.$api.getUserArticle({ userId: '60649c806e0c9a0001f9b98c' }).then(res => {
				const { data } = res
				if (data.length === 0) return
				this.articleList = data;
				this.loading = false
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
			padding: 10px;
			background-color: #f0f0f0;
			// box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2), -10px -10px 10px white;

			>.user-article__header__back,
			.user-article__header__add {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 8px;
				width: 66px;
				height: 36px;
				background-color: #f0f0f0;
				box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2), -10px -10px 10px white;
			}
		}

		.no-data {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			text-align: center;
			padding: 50px 0;
			color: #999;
			font-size: 14px;
		}
	}

	.el-hover {
		box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
			0 0 0 rgba(255, 255, 255, 0.2),
			inset 10px 10px 10px rgba(0, 0, 0, 0.1),
			inset -10px -10px 10px rgba(255, 255, 255, 1) !important;
	}
</style>
