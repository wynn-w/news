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
			<!-- <uni-load-more v-if="acticleLiks.length === 0 || acticleLiks.length  > (pageSize -1)" iconType="snow" :status="load"></uni-load-more> -->
			<view class="follow__content__article" v-if="choose === 0">

				<list-scroll :list="acticleLiks" @loadMore="loadMore" :load="load" :pageSize="pageSize" :current="choose"></list-scroll>
			</view>
			<view class="follow__content__author" v-else>
				作者页
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choose: 0,
				acticleLiks: [],
				pageSize: 5,
				load: {},
				loadMoreTag: false
			}
		},
		methods: {
			navChoose() {
				if (this.choose === 1) {
					return this.choose = 0
				}
				this.choose = 1
			},
			updateActicle(arg) {
				// const { flag = '' } = arg
				this.$api.getArticleLikes({
					// userId:'',
					page: this.load[this.choose].page,
					pageSize: this.pageSize
				}).then(res => {
					const { data } = res
					if (!this.load[this.choose]) {
						this.loadInit()
					}
					if (data.length === 0) {
						console.log(122);
						let old = this.load[this.choose]
						old.loading = "noMore"
						// old.page ='12222'
						this.load=Object.assign({},this.load,old) 
						// this.$forceUpdate()
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
			loadInit() {
				this.load[this.choose] = {
					page: 1,
					loading: 'loading'
				}
			}

		},
		onLoad() {
			this.loadInit()
			uni.$on('updateActicle', () => {
				this.load[this.choose].page = 1
				this.updateActicle()
			})
			this.updateActicle()
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.news-follow {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;


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
				font-weight: bold;
				border-bottom: 8rpx solid #FFFFFF;

				&.active {
					color: $base-color;
					border-bottom: 6rpx solid $base-color;
				}
			}
		}

		.follow__content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;

			>.follow__content__article {
				flex: 1;
				overflow: hidden;
			}

			>.follow__content__author {}
		}
	}
</style>
