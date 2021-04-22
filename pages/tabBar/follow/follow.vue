<template>
	<view class="news-follow">
		<!-- 导航 -->
		<view class="follow__header">
			<view class="follow__header__item" :class="{'active': choose === 0}" @click="navChoose(0)">
				文章
			</view>
			<view class="follow__header__item" :class="{'active': choose === 1 }" @click="navChoose(1)">
				作者
			</view>
		</view>
		<!-- 主体 -->
		<view class="follow__content">
			<view class="follow__content__article" :style="{height:height}" v-if="choose === 0">
				<uni-load-more v-if="GET_USER_INFO._id && acticleLiks.length === 0 " iconType="snow" :status="load[choose].loading"></uni-load-more>
				<list-scroll :list="acticleLiks" @loadMore="loadMore" :topLoadMore="false" :load="load" isSelf :pageSize="load[choose].pageSize" :current="choose"></list-scroll>
			</view>
			<view class="follow__content__author" v-else :style="{height:height}">
				<uni-load-more v-if="authorLiks.length === 0 " iconType="snow" :status="load[choose].loading"></uni-load-more>
				<list-scroll-slot :load="load" :pageSize="load[choose].pageSize" :current="choose">
					<uni-swipe-action threshold=60>
						<uni-swipe-action-item class="aass" data-aa='a' hover-class="el-hover" hover-stay-time="100" hover-start-time="0" show="right" v-for="(item,index) in authorLiks" :key="item.id">
							<list-item-author :author="item" @click="navToAuthor"> </list-item-author>
							<template v-slot:right>
								<view @click="deleteAuthorLike(item.id)" class="btn-delete-wrapper">
									<text class="btn-delete">取关</text>
								</view>
							</template>
						</uni-swipe-action-item>
					</uni-swipe-action>

				</list-scroll-slot>
			</view>

		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "news-follow",
		computed: {
			...mapGetters(['GET_LOGIN', 'GET_AUTH', 'GET_OPENID', 'GET_USER_INFO']),

		},
		data() {
			return {
				choose: 0,
				acticleLiks: [],
				authorLiks: [],
				load: {},
				loadMoreTag: false,
				loadMoreAuthorTag: false,
				contentInfo: null,
				height: `100px`
			}
		},
		methods: {
			navChoose(value) {
				if (this.choose === value) return
				if (this.choose === 1) {
					return this.choose = 0
				}
				this.choose = 1
				if (this.authorLiks.length === 0) {
					this.updataAuthor()
				}
			},
			deleteAuthorLike(id) {
				this.$api.updateAuthorLikes({
					authorId: id,
					userId: this.GET_USER_INFO._id
				}).then(res => {
					if (res.code === 200) {
						this.loadInit()
						this.updataAuthor({delete:true})
						uni.showToast({
							title: '取消关注成功',
							icon: 'none'
						})
					}
				})
			},
			deleteActicleLike(id) {
				uni.showModal({
					title: '提示',
					content: '取消收藏',
					cancelText: '返回',
					confirmText: '确认',
					success: (res) => {
						if (res.confirm) {
							this.$api.updateArticleLikes({
								articleId: id,
								userId: this.GET_USER_INFO._id
							}).then(res => {
								if (res.code === 200) {
									this.loadInit()
									this.updateActicle({delete:true})
									uni.showToast({
										title: '取消收藏成功',
										icon: 'none'
									})
								}
							})
						}
					}
				});

			},
			updataAuthor(arg) {
				if (!this.load[this.choose]) {
					this.loadInit()
				}
				if (!this.GET_USER_INFO._id) return
				this.$api.getAuthorLikes({
					userId: this.GET_USER_INFO._id,
					page: this.load[this.choose].page,
					pageSize: this.load[this.choose].pageSize
				}).then(res => {
					const { data } = res
					if (data.length === 0) {
						let old = this.load[this.choose]
						old.loading = "noMore"
						if(arg && arg.delete){
							this.authorLiks=[]
						}
						this.load = Object.assign({}, this.load, old)
						return
					}
					//loadMore 触发的更新
					// if (arg && arg.flag === "loadMore") {
					// 	this.authorLiks.push(...data)
					// 	this.loadMoreAuthorTag = false
					// 	return
					// }
					this.loadMoreAuthorTag = false
					this.authorLiks = data
				})
			},
			updateActicle(arg) {
				if (!this.load[this.choose]) {
					this.loadInit()
				}
				if (!this.GET_USER_INFO._id) return
				this.$api.getArticleLikes({
					userId: this.GET_USER_INFO._id,
					page: this.load[this.choose].page,
					pageSize: this.load[this.choose].pageSize
				}).then(res => {

					const { data } = res
					if (data.length === 0) {
						let old = this.load[this.choose]
						old.loading = "noMore"
						if(arg && arg.delete){
							this.acticleLiks=[]
						}
						this.load = Object.assign({}, this.load, old)
						this.$forceUpdate()
						return
					}
					// loadMore 触发的更新
					if (arg && arg.flag === "loadMore") {
						this.acticleLiks.push(...data)
						this.loadMoreTag = false
						return
					}
					this.loadMoreTag = false
					this.acticleLiks = data
				})
			},
			loadMore() {

				if (this.loadMoreTag) return
				this.loadMoreTag = true
				if (this.load[this.choose].loading === "noMore") return
				this.load[this.choose].page++
				this.updateActicle({ flag: 'loadMore' })

			},
			// loadMoreAuthor() {
			// if (this.loadMoreAuthorTag) return
			// this.loadMoreAuthorTag = true
			// if (this.load[this.choose].loading === "noMore") return
			// this.load[this.choose].page++
			// this.updateAuthor({ flag: 'loadMore' })

			// },

			/**
			 *  初始化相关
			 * */
			loadInit() {
				if (this.choose) {
					this.$set(this.load, this.choose, {
						page: 1,
						loading: 'loading',
						pageSize: 6
					})
					return
				}
				this.$set(this.load, this.choose, {
					page: 1,
					loading: 'loading',
					pageSize: 7
				})
			},
			// content 区域高度
			calcHeight() {
				// #ifndef H5 ||APP-PLUS ||MP-ALIPAY
				let view = uni.createSelectorQuery().select('.follow__content__article')
				view.fields({ rect: true }, data => {
					this.height = `${data.top}px`
				}).exec()
				// #endif
			},
			// 所有外部事件监听
			eventListener() {
				uni.$on('updateActicle', () => {
					this.load[this.choose].page = 1
					this.updateActicle()
				})
				uni.$on('updataAuthorLikes', () => {
					this.updataAuthor()
				})
				uni.$on('deleteActicleLike', (res) => {
					this.deleteActicleLike(res)
				})
			},
			async isULogin() {
				await this.$api.isULogin({ $store: this.$store, currentUrl: this.$mp.page.route })

			}
		},
		async onLoad() {
			this.calcHeight()
			this.loadInit()
			this.eventListener()
			this.updateActicle()

		},
		async onShow() {
			if (!this.GET_LOGIN) {
				// #ifdef MP-WEIXIN
				uni.showModal({
					title: '提示',
					content: '当前还未登录，登录后解锁',
					success: async (res) => {
						if (res.confirm) {
							await this.isULogin()
						} else if (res.cancel) {
							console.log('取消')
						}


					}
				})
				// #endif
				// #ifdef H5
				await this.isULogin()
				// #endif

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #efeeee;
	}

	.news-follow {
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;


		.follow__header {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin: 20rpx;
			margin-bottom: 40rpx;
			box-sizing: border-box;

			.follow__header__item {
				padding: 20rpx 0;
				font-size: 32rpx;
				font-weight: 500;
				color: #838383;
				border-bottom: 8rpx solid transparent;

				&.active {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 4px 20px;
					border: 1px solid #f3f3f3;
					border-radius: 20px;
					color: $base-color;
					font-weight: 700;
					line-height: 1;
					box-shadow: inset 2px 2px 4px #babecc, inset -2px -2px 4px #e4e4e4
				}
			}
		}

		.follow__content {
			display: flex;
			flex-direction: column;
			flex: 1;

			>.follow__content__article {
				// display: flex;
				flex: 1;

				.news-list__scroll {
					height: 100%;
				}

			}

			>.follow__content__author {
				flex: 1;

				.aass {
					margin: 60rpx 20rpx;
					box-sizing: border-box;
					background-color: #f0f0f0;
					border-radius: 16rpx;
					box-shadow: 10rpx 14rpx 20rpx rgba(0, 0, 0, 0.2), -16rpx -10rpx 16rpx #ffffff;

					&.el-hover {
						box-shadow: 0 0 0 rgba(0, 0, 0, 0.2),
							0 0 0 rgba(255, 255, 255, 0.2),
							inset 10px 10px 10px rgba(0, 0, 0, 0.1),
							inset -10px -10px 10px rgba(255, 255, 255, 1) !important;
					}
				}

				.news-list__scroll {
					height: 100%;
				}
			}
		}
	}

	.btn-delete-wrapper {
		display: flex;
		width: 100rpx;
		height: 100%;

		.btn-delete {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			box-sizing: border-box;
			background-color: $base-color;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: 500;
			line-height: 1;
			letter-spacing: 3rpx;

		}

	}
</style>
