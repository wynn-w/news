<template>
	<view class="list-item-author" @longpress="emitLongpress">
		<view class="list-item-author-image">
			<image :src="`https://images.weserv.nl/?url=${author.avatar}`" mode="aspectFill"></image>
		</view>
		<view class="list-item-author__content">
			<view class="list-item-author__content__title">{{author.author_name}}</view>
			<view class="list-item-author__content__des">
				<view class="list-item-author__content__desc-label">{{author.professional}}</view>
				<view class="list-item-author__content__des-info">
					<text>发帖 {{author.article_ids.length}}</text>
					<text>粉丝 {{author.fans_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		name: "list-item-author",
		props: {
			author: Object
		},
		methods:{
			emitLongpress(){
				this.$emit('longpress',this.author.id)
			}
			
		}
	}
</script>

<style lang="scss">
	.list-item-author {
		display: flex;
		padding: 20rpx 0;
		margin: 0 20rpx;
		flex:1;
		box-sizing: border-box;
		border-bottom: 2rpx #F5F5F5 solid;

		.list-item-author-image {
			flex-shrink: 0;
			width: 90rpx;
			height: 90rpx;
			border-radius: 8rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-item-author__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 20rpx;
			width: 100%;

			.list-item-author__content__title {
				// position: relative;
				padding-right: 60rpx;
				font-size: 28rpx;
				color: #666;
				font-weight: bold;
				line-height: 1.2;
			}

			.list-item-author__content__des {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;

				.list-item-author__content__desc-label {
					color: #888;
				}

				.list-item-author__content__des-info {
					color: #999;
					line-height: 1.5;

					text:first-child {
						margin-right: 20rpx;
					}
				}
			}
		}
		&:last-child{
			border-radius: 20rpx;
		}
	}
</style>
