<template>
	<view class="news-navbar">
		<view class="news-navbar--fixed">
			<view class="system-barHeight" :style="{height:`${statusBarHeight}px`}"></view>
			<view class="news-navbar__content" :style="{height:`${contentInfo.height}px`,width:`${contentInfo.width}px`}">
				<view class="news-navbar__search" :style="{height:`${searchInfo.height}px`}">
					<view class="news-navbar__search__icon">
						<uni-icons type="search" size="16" color="#555666"></uni-icons>
					</view>
					<view class="news-navbar__search__text">
						user input history
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
		data() {
			return {
				statusBarHeight: 0,
				contentInfo: {
					height: 45,
					width: ''
				},
				searchInfo: {
					height: 30
				}
			};
		},
		mounted() {
			const {
				statusBarHeight
			} = uni.getSystemInfoSync()
			// #ifndef H5 ||APP-PLUS ||MP-ALIPAY
			const {
				bottom,
				top,
				left,
				height
			} = uni.getMenuButtonBoundingClientRect() //小程序右上角菜单的 dom 信息
			this.statusBarHeight = statusBarHeight
			this.contentInfo.height = bottom + top - statusBarHeight * 2
			this.contentInfo.width = left
			this.searchInfo.height = height
			// #endif

			// console.log(uni.getSystemInfoSync());
			// console.log(uni.getMenuButtonBoundingClientRect());
		}
	}
</script>

<style lang="scss">
	.news-navbar {

		// display: flex;
		// flex-direction: column;
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
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;

				>.news-navbar__search {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					width: 100%;

					border-radius: 30px;
					border: 1px solid #d89595;
					color: #555666;
					background-color: #f9e6e6;

					>.news-navbar__search__icon {
						// width: 10px;
						// height: 10px;
						margin: 0 16px;
						// border: 1px solid #007AFF;
					}

					>.news-navbar__search__text {

						font-size: 12px;
					}

				}
			}


		}

		.system-barHeight {
			width: 100%;
		}
	}
</style>
