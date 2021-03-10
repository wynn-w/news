<template>
	<view class="news-list-item">
		<view class="news-list-item-wrapper">
			<view class="news-list-item__image-box">
				<image src="../../static/23488806-8ebae730d29122c4.jpg" mode="widthFix"></image>
			</view>
			<view class="news-list-item__content">
				<view class="news-list-item__content__title">
					uniapp 简直了
				</view>
				<view class="news-list-item__content__other">
					<view class="news-list-item__content__other__label">
						前端
					</view>
					<view class="news-list-item__content__other__browse">
						xxx 人浏览
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.news-list-item {
		
		.news-list-item-wrapper{
			display: flex;
			flex-direction: row;
			width: 100%;
			>.news-list-item__image-box {
				width: 120px;
				margin: 0 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			>.news-list-item__content {
				display: flex;
				flex-direction: column;
				flex: 1;
				>.news-list-item__content__other{
					display: flex;
					flex-direction: row;
					justify-content:space-between;
					margin-top: auto;
					margin-bottom: 6px;
					box-sizing: border-box;
					line-height: 1;
					font-size: 14px;
					>.news-list-item__content__other__label{
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 2px 6px;
						margin-right: 11px;
						color: $base-color;
						border: 1px solid $base-color;
						border-radius: 20px;
					}
					>.news-list-item__content__other__browse{
						margin-right: 11px;
						padding-top: 2px;
						color: #999999;
					}
				}
			
			}
			
		}
		&::after{
			content: '';
			display: block;
			width: 100%;
			height: 1px;
			background-color: #e3e3e3;
			margin: .1rem 0 .4rem 0;
		}
	}
</style>
