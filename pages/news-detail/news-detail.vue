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
			<view class="detail__content__html">
				<u-parse :content="article.content" :noData="noData"></u-parse>
			</view>
		</view>
		<view class="detail__control">
			<view class="detail__control__input" @click="openComment">
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
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-box">
				<view class="popup-header">
					<text class="popup-header__item" @click="closeComment">取消</text>
					<text class="popup-header__item" @click="publishComment">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="popupValue" placeholder="请输入评论" fixed maxlength="200" />
					</view>
				<view class="popup-count">{{popupValue.length}}/200</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uParse from "@/components/gaoyia-parse/parse.vue"
	export default {
		components: { uParse },
		data() {
			return {
				article: Object.create({}),
				noData: '<p stye="text-align:center;color:#666">加载中....</p>',
				popupValue:''
			};
		},
		methods: {
			getDetail() {
				this.$api.getArticleDetail({
					articleId: this.article._id,
					// userId: //当前用户 id ，游客则为空
				}).then(res => {
					const { data } = res
					this.article = Object.assign({}, this.article, data)
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 *	comment 相关 
			 **/ 
			openComment(){
				this.$refs.popup.open()
			},
			closeComment(){
				this.$refs.popup.close()
			},
			publishComment(){
				if(!this.popupValue) {
					uni.showToast({
						title:"请输出评论内容",
						icon:"none"
					})
					return
				}
				this.$api.updataComment({
					articleId: this.article._id,
					content:this.popupValue
				}).then(res=>{
					console.log(res);
					this.$refs.popup.close()
					uni.showToast({
						title:"评论成功",
						icon:"success"
					})
				})
			}
		},
		onLoad(optios) {
			const data = JSON.parse(optios.params);
			this.article = Object.assign({}, this.article, data)
			this.getDetail()
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
			margin: 40rpx 0;
			min-height: 1000rpx;

			.detail__content__html {
				height: inherit;
				padding: 0 30rpx;
			}
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
		.popup-box{
			background-color: #FFFFFF;
			padding: 0 30rpx;
			>.popup-header{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #666666;
				border-bottom: 1rpx #F5F5F5;
				>.popup-header__item{
					height: 100rpx;
					line-height: 100rpx;
					
					&:hover{
						opacity: 0.8;
					}
				}
			}
			.popup-textarea{
				width: 100%;
				height: 400rpx;
			}
			>.popup-count{
				display: flex;
				justify-content: flex-end;
				padding-bottom: 10rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
	
	}
</style>
