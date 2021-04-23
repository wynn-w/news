<template>
	<view class="news-tab">
		<scroll-view class="news-tab__srcoll" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view class="news-tab__srcoll-box">
				<view v-for=" (item,index) in list" :key="index" @click="clickItem(item,index)" :id="`item-${index}`" class="news-tab__srcoll__item" :class="{active: activeIndex === index}">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tab',
		props: {
			list: Array,
			tabIndex: {
				type: [Number, String],
				default: 0
			}
		},
		watch: {
			tabIndex(newValue) {
				this.activeIndex = newValue
				this.scroll(this.activeIndex)
			}
		},
		data() {
			return {
				activeIndex: 0,
				scrollLeft: 0, // scroll-view 偏移距离
				screenWidth: 0, // 视口的1/2
				widthList: [], // 所有 item 的宽度
				scrollList: [] // item 距离文档左部的距离
			}
		},
		methods: {
			clickItem(item, index) {
				
				this.activeIndex = index
				this.$emit("update:selected", { data: item, index })
				

			},
			scroll(index){
				if (this.widthList.length === 0) {
					this.calculateItemWidth()
				}
				let widthCopy = this.widthList;
				let scrollWidth = this.scrollList[index]; //距离文档左部的距离
				const currentWidth = widthCopy[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -= this.screenWidth;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateWindowWidth() {
				let info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth / 2;
			},
			// 获取所有 item 宽度
			calculateItemWidth() {
				let arr1 = [];
				let arr2 = [];
				let lastWidth = 0
				const LENGTH = this.list.length
				for (let i = 0; i < LENGTH; i++) {
					let view = uni.createSelectorQuery().in(this).select(`#item-${i}`);
					view.fields({
						size: true
					}, data => {
						const width = data.width
						lastWidth += width
						if (i === 0) {
							arr1.push(0);
						} else {
							arr1.push(lastWidth);
						}

						arr2.push(data.width)

					}).exec()
				}
				this.widthList = Object.assign([], this.widthList, arr2)
				this.scrollList = Object.assign([], this.scrollList, arr1)

			},
		},
		mounted() {
			this.activeIndex = this.tabIndex
			this.calculateWindowWidth()
		}
	}
</script>

<style lang="scss">
	.news-tab {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: #efeeee;
		box-sizing: border-box;

		>.news-tab__srcoll {
			display: flex;
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			// overflow: -moz-hidden-unscrollable;
			// scrollbar-width: none;
			// height: calc(100% + 36rpx);
			width: 100%;

			overflow: auto;

			.news-tab__srcoll-box {
				display: flex;
				flex: 1;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				box-sizing: border-box;
				height: 90rpx;



				.news-tab__srcoll__item {
					display: inline-flex;
					padding: 0 28rpx;
					font-size: 28rpx;
					color: #8f8f94;
					flex-shrink: 0;
					box-sizing: border-box;

					&.active {
						color: $base-color;
						transition: all 0.5s ease;
					}
				}
			}

		}

		.news-tab__icon {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 16rpx;

			&::after {
				position: absolute;
				top: 24rpx;
				left: 0;
				bottom: 24rpx;
				left: 0px;
				content: "";
				width: 2rpx;
				background-color: #c4c4ca;
			}
		}

		/**
		 * 隐藏滚动条
		 */
		// chrome
		.news-tab__srcoll ::-webkit-scrollbar {
			display: none
		}

		// ie/edge
		.news-tab__srcoll {
			-ms-overflow-style: none;
		}

		// firefox ==> 无法跳动 ==>放弃了
		// .news-tab__srcoll {
		// 	// scrollbar-width: none;
		// 	// padding: 0 0 32rpx 0;
		// 	overflow: hidden;

		// 	.news-tab__srcoll-box {
		// 		// /overflow:-moz-scrollbars-none;

		// 		margin-bottom: -16px;
		// 		overflow-x: scroll;
		// 		overflow-y: hidden;

		// 	}
		// }
	}
</style>
