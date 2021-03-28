<template>
	<view class="news-detail">
		<view class="detail__title">
			{{article.title}}
		</view>
		<view class="detail__urs-info">
			<view class="detail__urs-info__avatar">
				<image src="../../static/logo.png" mode="" mode="aspectFill"></image>
				<!-- <image :src="article.author.avatar" mode="" mode="aspectFill"></image> -->
			</view>
			<view class="detail__urs-info__content">
				<view class="detail__urs-info__content__urs-name">
					{{article.author.author_name}}
				</view>
				<view class="detail__urs-info__content__article">
					<text>{{article.create_time}}</text>
					<text>{{article.browse_count}} 浏览</text>
					<text>{{article.thumbs_up_count}} 点赞</text>
				</view>
			</view>
			<button class="detail-urs-info__button" type="default">
				关注
			</button>
		</view>
		<view class="detail__content">
			内容
		</view>
		<view class="detail__control">
			<view class="detail__control__input">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail__control__icons">
				<view class="detail__control__icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail__control__icons-box">
					<uni-icons type='heart' size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail__control__icons-box">
					<uni-icons type='hand-thumbsup' size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: Object.create({})
			};
		},
		onLoad(optios) {
			const data = JSON.parse(optios.params);
			this.article = Object.assign({}, this.article, data)
		}
	}
</script>

<style lang="scss">
	.news-detail {
		display: flex;
		flex-direction: column;
		padding: 15rpx 0;
		padding-bottom: 54rpx;

		>.detail__title {
			padding: 0 30rpx;
			font-size: 35rpx;
			font-weight: bold;
			color: #333333;
		}

		>.detail__urs-info {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			padding: 0 30rpx;

			>.detail__urs-info__avatar {
				flex-shrink: 0;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			>.detail__urs-info__content {
				width: 100%;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 24rpx;
				flex: 1;

				>.detail__urs-info__content__urs-name {
					font-size: 28rpx;
					color: #333;
				}

				>.detail__urs-info__content__article {
					color: #999;

					text:not(:first-child) {
						margin-right: 20rpx;
					}
				}


			}

			>.detail-urs-info__button {
				padding: 0 30rpx;
				flex-shrink: 0;
				height: 60rpx;
				font-size: 24rpx;
				line-height: 60rpx;
				border-radius: 10rpx;
				color: #fff;
				background-color: $base-color;
				letter-spacing: 5rpx;
			}
		}

		>.detail__content {
			flex: 1;
		}

		>.detail__control {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 88rpx;
			// #ifdef MP
			height: 108rpx;
			padding-bottom: 10rpx;
			//  #endif
			
			border-top: 1rpx #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;

			.detail__control__input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 20rpx;
				padding: 0 20rpx;
				width: 100%;
				height: 60rpx;
				border: 1rpx #ddd solid;
				border-radius: 10rpx;

				text {
					font-size: 28rpx;
					color: #999;
				}
			}

			.detail__control__icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 20rpx;

				.detail__control__icons-box {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 88rpx;
				}
			}
		}
	}
</style>
