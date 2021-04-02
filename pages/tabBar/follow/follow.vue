<template>
	<view class="news-follow">
		<!-- 导航 -->
		<view class="follow__header">
			<view class="follow__header__item" :class="{'active': choose === 0}" @click="navChoose">
				文章
			</view>
			<view class="follow__header__item" :class="{'active': choose === 1 }" @click="navChoose">
				作者
			</view>
		</view>
		<!-- 主体 -->
		<view class="follow__content">
			<view class="follow__content__article" :style="{height:height}" v-if="choose === 0">
				<uni-load-more v-if="acticleLiks.length === 0 " iconType="snow" status="loading"></uni-load-more>
				<list-scroll :list="acticleLiks" @loadMore="loadMore" :load="load" :pageSize="load[choose].pageSize" :current="choose"></list-scroll>
			</view>
			<view class="follow__content__author" v-else :style="{height:height}">
				<uni-load-more v-if="authorLiks.length === 0 " iconType="snow" status="loading"></uni-load-more>
				<list-scroll-slot @loadMore="loadMoreAuthor" :load="load" :pageSize="load[choose].pageSize" :current="choose">
					<list-item-author class="" v-for="item in authorLiks" :author="item" @longpress="deleteAuthorLike"> </list-item-author>
				</list-scroll-slot>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "news-follow",
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
			navChoose() {
				if (this.choose === 1) {
					return this.choose = 0
				}
				this.choose = 1
				if (this.authorLiks.length === 0) {
					this.updataAuthor()
				}
			},
			deleteAuthorLike(id) {
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '这是一个模态弹窗',
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				console.log('用户点击确定');
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});
			// 	// this.$api.updateAuthorLikes({
			// 	// 	authorId: id
			// 	// }).then(res=> console.log(res))
			},
			updataAuthor(arg) {
				if (!this.load[this.choose]) {
					this.loadInit()
				}
				this.$api.getAuthorLikes({
					// userId:'',
					page: this.load[this.choose].page,
					pageSize: this.load[this.choose].pageSize
				}).then(res => {
					// this.authorLiks = Object.assign({}, this.authorLiks, res.data)

					const { data } = res

					if (data.length === 0) {
						let old = this.load[this.choose]
						old.loading = "noMore"
						this.load = Object.assign({}, this.load, old)
						return
					}
					//loadMore 触发的更新
					if (arg && arg.flag === "loadMore") {
						this.authorLiks.push(...data)
						this.loadMoreAuthorTag = false
						return
					}
					this.loadMoreAuthorTag = false
					this.authorLiks = data
				})
			},
			updateActicle(arg) {
				if (!this.load[this.choose]) {
					this.loadInit()
				}
				this.$api.getArticleLikes({
					// userId:'',
					page: this.load[this.choose].page,
					pageSize: this.load[this.choose].pageSize
				}).then(res => {
					const { data } = res
					if (data.length === 0) {
						let old = this.load[this.choose]
						old.loading = "noMore"
						this.load = Object.assign({}, this.load, old)
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
			loadMoreAuthor() {
				console.log(121222212);
				// if (this.loadMoreAuthorTag) return
				// this.loadMoreAuthorTag = true
				// if (this.load[this.choose].loading === "noMore") return
				// this.load[this.choose].page++
				// this.updateAuthor({ flag: 'loadMore' })

			},
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
			calcHeight() {
				// #ifndef H5 ||APP-PLUS ||MP-ALIPAY
				let view = uni.createSelectorQuery().select('.follow__content__article')
				view.fields({ rect: true }, data => {
					this.height = `${data.top}px`
				}).exec()
				// #endif
			}

		},
		onLoad() {
			this.loadInit()
			uni.$on('updateActicle', () => {
				this.load[this.choose].page = 1
				this.updateActicle()
			})
			uni.$on('updataAuthorLikes', () => {
				// this.load[this.choose].page = 1
				this.updataAuthor()
			})
			this.updateActicle()
			this.calcHeight()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.news-follow {
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;


		.follow__header {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-bottom: 40rpx;
			box-sizing: border-box;

			.follow__header__item {
				padding: 20rpx 0;
				font-size: 32rpx;
				font-weight: 500;
				color: #838383;
				border-bottom: 8rpx solid transparent;

				&.active {
					color: $base-color;
					border-bottom: 6rpx solid $base-color;
					font-weight: 700;
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

				.news-list__scroll {
					height: 100%;
				}
			}
		}
	}
</style>
