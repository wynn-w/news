<template>
	<view class="news-navbar">
		<view class="news-navbar--fixed">
			<view class="system-barHeight" :style="{height:`${statusBarHeight}px`}"></view>

			<view @click="navToSearch" class="news-navbar__content" :class="{search:isSearch}" :style="{height:`${contentInfo.height}px`,width:`${contentInfo.width}px`}">
				<!-- 搜索页 -->
				<view v-if="isSearch" class="news-navbar__icon" @click="navBack">
					<uni-icons type="back" size="22" color="#ffffff"></uni-icons>
				</view>
				<view v-if="isSearch" class="news-navbar__search">
					<view class="news-navbar__search__icon">
						<uni-icons type="search" size="16" color="#555666"></uni-icons>
					</view>
					<view class="news-navbar__search__text">

						<input class="news-navbar__search__text" type="text" :value="value" @input="input"
						       placeholder="搜索" @confirm="submit" />
					</view>
					<view class="news-navbar__search__icon" @click="clear" ref="clearIcon" :style="{display: iconbox}">
						<uni-icons type="clear" size="16" color="#a0a3bf"></uni-icons>
					</view>
				</view>
				<!-- 首页 -->
				<view v-else class="news-navbar__search" :style="{height:`${searchInfo.height}px`}">
					<view class="news-navbar__search__icon">
						<uni-icons type="search" size="16" color="#555666"></uni-icons>
					</view>
					<view class="news-navbar__search__text">
						点击搜索
					</view>

				</view>

			</view>

		</view>
		<!-- 占位，代替 news-navbar--fixed 填充布局 -->
		<view :style="{height: `${statusBarHeight + contentInfo.height}px`}"></view>
	</view>
</template>

<script>
	export default {
		name: "new-bar",
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: String,
		},
		model: {
			prop: "value",
			event: "input"
		},
		computed: {
			iconbox() {
				let display = this.iconStyle.display
				if (this.value) return display = "block"
				return display = "none"
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				contentInfo: { height: 45, width: '' },
				searchInfo: { height: 30 },
				iconStyle: {
					display: 'none'
				}
			};
		},
		mounted() {
			const { statusBarHeight } = uni.getSystemInfoSync()
			// #ifndef H5 ||APP-PLUS ||MP-ALIPAY
			const { bottom, top, left, height } = uni.getMenuButtonBoundingClientRect() //小程序右上角菜单的 dom 信息
			this.statusBarHeight = statusBarHeight
			this.contentInfo.height = bottom + top - statusBarHeight * 2
			this.contentInfo.width = left
			this.searchInfo.height = height
			// #endif
		},
		methods: {
			navToSearch() {
				if (this.isSearch) { return }
				uni.navigateTo({
					url: "/pages/home-search/home-search"
				})
			},
			navBack() {
				uni.navigateBack()
			},
			input(e) {
				this.$emit('input', e.detail.value)
			},
			submit(e) {
				this.$emit('comfirm', { value: e.detail.value })
			},
			clear() {
				this.iconStyle.display = 'none'
				this.$emit('input', '')
			}
		},
	}
</script>

<style lang="scss">
	page {
		box-sizing: border-box;
	}

	.news-navbar {
		>.news-navbar--fixed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99;
			background-color: $base-color;

			>.news-navbar__content {
				box-sizing: border-box;
				padding: 0 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;

				>.news-navbar__search {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					width: 100%;
					box-sizing: border-box;
					border-radius: 30px;
					border: 1px solid #d89595;
					color: #555666;
					background-color: #f9e6e6;

					>.news-navbar__search__icon {
						margin: 0 8rpx 0 22rpx;

						&:last-child {
							margin: 0 8rpx;
							display: none;
							color: #a3a5c3;

							.uni-icons {
								&:hover {
									color: #887e7e !important;
								}
							}

						}
					}

					>.news-navbar__search__text {
						font-size: 26rpx;
					}

				}

				&.search {
					padding-left: 0;

					>.news-navbar__icon {
						margin: 0 10rpx;
					}

					>.news-navbar__search {
						border-radius: 16rpx;

						>.news-navbar__search__text {
							box-sizing: border-box;
							width: 100%;
							padding: 8rpx 10rpx;

							>input {
								width: 100%;
								font-size: 26rpx;
								color: #555666;

							}
						}
					}
				}
			}


		}

		.system-barHeight {
			width: 100%;
		}
	}
</style>
