<template>
	<view class="news-list-item" @click="openDetail">
		<view class="news-list-item-wrapper" v-if="item.mode === 'base'">
			<view class="news-list-item__image-box">
				<image class="news-list-item__image-box_img" src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="news-list-item__content">
				<view class="news-list-item__content__title">
					<text>{{item.title}}</text>
				</view>
				<view class="news-list-item__content__other">
					<view class="news-list-item__content__other__label">
						{{item.classify}}
					</view>
					<view class="news-list-item__content__other__browse">
						<text>{{item.browse_count}}人浏览</text>
					</view>
				</view>
			</view>
		</view>
		<view class="news-list-item-wrapper isColumn" v-else-if="item.mode === 'column'">

			<view class="news-list-item__content">
				<view class="news-list-item__content__title">
					<text>{{item.title}}</text>
				</view>
				<view class="news-list-item__image-box">
					<image class="news-list-item__image-box_img" src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="news-list-item__content__other">
					<view class="news-list-item__content__other__label">
						{{item.classify}}
					</view>
					<view class="news-list-item__content__other__browse">
						<text>{{item.browse_count}}人浏览</text>
					</view>
				</view>
			</view>
		</view>
		<view class="news-list-item-wrapper isList" v-else="item.mode === 'image'">

			<view class="news-list-item__content">
				<view class="news-list-item__content__title">
					<text>{{item.title}}</text>
				</view>
				<view class="news-list-item__image-box">
					<image v-for="i in 3" :key="i" class="news-list-item__image-box_img" src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="news-list-item__content__other">
					<view class="news-list-item__content__other__label">
						{{item.classify}}
					</view>
					<view class="news-list-item__content__other__browse">
						<text>{{item.browse_count}}人浏览</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "list-item",
		props: {
			item: {
				type: Object,
				required: true
			}
		},
		methods: {
			openDetail() {
				const item = this.item
				this.$emit('clickItem', item) //通知外部
				console.log('item');
				console.log(item);
				const params = {
					_id: item._id,
					title: item.title,
					create_time: item.create_time,
					thumbs_up_count: item.thumbs_up_count,
					browse_count: item.browse_count,
					author: item.author
				}
				uni.navigateTo({
					url: `/pages/news-detail/news-detail?params=${JSON.stringify(params)}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-list-item {
		width: 100%;

		.news-list-item-wrapper {
			display: flex;
			flex-direction: row;
			width: 100%;
			margin-bottom: .4rem;

			>.news-list-item__image-box {
				width: 6rem;
				height: 6rem;
				overflow: hidden;
				margin: 0 10rpx;

				.news-list-item__image-box_img {
					width: 100%;
					height: 100%;
					border-radius: .3rem;
				}

			}

			>.news-list-item__content {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin: 0 10rpx;

				>.news-list-item__content__title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //作为弹性伸缩盒子模型显示。
					-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
					-webkit-line-clamp: 2; //显示的行
				}

				>.news-list-item__content__other {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-top: auto;
					box-sizing: border-box;
					line-height: 1;
					font-size: .8rem;

					>.news-list-item__content__other__label {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 2rpx 6rpx;
						margin-right: 11rpx;
						color: $base-color;
						border: 1rpx solid $base-color;
						border-radius: .3rem;
					}

					>.news-list-item__content__other__browse {
						margin-right: 4rpx;
						padding-top: 2px;
						color: #999999;
					}
				}

			}

		}

		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 1px;
			background-color: #e3e3e3;
			margin: .1rem 0 .4rem 0;
		}

		.isColumn {
			display: flex;
			flex-direction: column;

			>.news-list-item__content {
				.news-list-item__content__title {
					margin-bottom: 10rpx;
				}

				>.news-list-item__image-box {
					width: 100%;
					height: 7rem;

					>.news-list-item__image-box_img {
						width: 100%;
						height: 100%;
						border-radius: .3rem;
						overflow: hidden;
					}
				}

				.news-list-item__content__other {
					margin-top: .4rem;

					>.news-list-item__content__other__browse {
						margin-right: 4rpx;
					}
				}

			}


		}

		.isList {
			display: flex;
			flex-direction: column-reverse;
			position: relative;


			>.news-list-item__content {
				.news-list-item__content__title {
					margin-bottom: 10rpx;
				}

				>.news-list-item__image-box {
					width: 100%;
					height: 7rem;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					overflow: hidden;

					>.news-list-item__image-box_img {
						border-radius: .3rem
					}

					>.news-list-item__image-box_img:not(:first-child) {
						margin-left: 10rpx;
					}
				}

				.news-list-item__content__other {
					margin-top: .4rem;

					>.news-list-item__content__other__browse {
						margin-right: 4rpx;
					}
				}
			}
		}

		/* #ifdef MP */
		&:last-child {
			padding-bottom: .5rem;
		}

		/* #endif */
	}
</style>
