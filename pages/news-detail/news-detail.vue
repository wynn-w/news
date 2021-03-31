<template>
	<view class="news-detail">
		<!-- 文章标题 -->
		<view class="detail__title">
			{{article.title}}
		</view>
		<!-- 作者/文章信息 -->
		<view class="detail__urs-info">
			<view class="detail__urs-info__avatar">
				<!-- <image src="../../static/logo.png" mode="" mode="aspectFill"></image> -->
				<image :src="article.author.avatar" mode="" mode="aspectFill"></image>
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
			<!-- 文章内容 -->
			<view class="detail__content__html">
				<u-parse :content="article.content" :noData="noData"></u-parse>
			</view>
			<!-- 文章评论 -->
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentList" :key="item.comment_id">
					<news-comment :comment="item" @reply="reply"></news-comment>
				</view>
				<view class="comment-title" v-if="commentList.length === 0">
					快来添加第一条评论吧
				</view>
			</view>
		</view>
		<!-- 底部控件 -->
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


		<!-- 发布评论弹窗 -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-box">
				<view class="popup-header">
					<text class="popup-header__item" @click="closeComment">取消</text>
					<text class="popup-header__item" @click="publishComment">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" :style="{height:`${height}rpx`}" v-model="popupValue" :placeholder="replyTo?`回复 ${replyTo}:`:'请输入评论' " fixed maxlength="200" />
					<!-- 占位 -->
					<view :style="{height: `${400 - height}rpx` }"></view>
				</view>
					<view class="popup-content_other">
						<view class="popup-emoji" :class="{'emoji-active':emojiDataInited}" @click="emojiHandle">表情</view>
						<view class="popup-count">{{popupValue.length}}/200</view>
					</view>
					
				<swiper class="slider" v-if="emojiDataInited" :indicator-dots="true" :current="0" >
					<swiper-item v-for="(item, key) in emojiData" :key="key" class="slider-emoji" :class="[key==emojiData.length-1?'lastbox':'']">
						<text v-for="(emoji, index) in item" :key="index" @click="selemoji(emoji)" class="slider-emoji-icon ">{{ emoji }} </text>
					</swiper-item>
				</swiper>
			</view>
			
		</uni-popup>
		
	</view>
</template>

<script>
	import emoji from "@/js_sdk/m-emoji/emoji";
	import uParse from "@/components/gaoyia-parse/parse.vue"
	export default {
		name:"news-detail",
		components: { uParse },
		computed:{
			height(){
				return this.textarea.height
			}
		},
		data() {
			return {
				article: Object.create({}),
				noData: '<p stye="text-align:center;color:#666">加载中....</p>',
				popupValue:'',
				commentList:[],
				replyProps:{} ,
				replyTo:'',
				textarea:{
					height: 400
				},
				isPass : false, //敏感词检测
				emojiData:[], //表情包数组
				emojiDataInited :false
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
				this.closeEmoji()
			},
			// 发布评论
			async publishComment(){
				if(!this.popupValue) {
					uni.showToast({
						title:"请输入评论内容",
						icon:"none"
					})
					return
				}
				await this.$api.checkWords(this.popupValue).then(res=>{
					if(res && res.length === 0 ){
						this.isPass = true
					}
				})
				this.updateComment({content:this.popupValue,...this.replyProps})
			},
			updateComment(content){
				const data = {
					articleId: this.article._id,
					...content
				}
				this.$api.updataComment(data).then(res=>{
					this.$refs.popup.close()
					this.getArticleComments()
					
					uni.showToast({
						title:"评论成功",
						icon:"success"
					})
					this.clearCache()
				})
			},
			// 获取评论
			getArticleComments(){
				this.$api.getComments({
					articleId: this.article._id
				}).then(res=>{
					const {data} = res
					this.commentList= Object.assign([],this.commentList,data)
				})
			},
			// 回复评论
			reply(res){
				this.openComment()
				this.replyProps={
					'commentId' : res.comment.commentId,	 // 被回复评论 ID
					'isReply': res.isReply,					 // 递归组件 标记
				}
				this.replyTo=res.replyTo					 // 被回复对象名字
				// 当回复对象为 递归组件
				res.isReply && ( this.replyProps.replyId = res.comment.replyId )
			},
			
			/**
			 * 接收前一页传递的数据
			 * */
			formatParma(value){
				// #ifdef MP
				const data =  JSON.parse(value)
				//#endif
				
				//#ifdef H5
				const data =  JSON.parse(decodeURIComponent(window.atob(value)))
				// #endif
				return data
			},
			
			/**
			 * 页面操作缓存清除
			 * */
			 clearCache(){
				 this.replyProps = {}
				 this.popupValue = ''
				 this.closeEmoji()
				 this.replyTo = ''
			 },
			 
			/**
			 * 表情包相关
			 * */
			selemoji(m) {
				this.popupValue += m
			},
			openEmoji(){
				this.emojiDataInited= true
				this.textarea.height =112
			},
			closeEmoji(){
				this.emojiDataInited= false
				this.textarea.height =400
			},
			emojiHandle(){
				if(!this.emojiDataInited){
					return this.openEmoji()
				}
				this.closeEmoji()
			},
			InitEmoji(emoji){
				let page = Math.ceil(emoji.length/42);
				for (let i = 0; i < page; i++) {
					this.emojiData[i] = [];
					for (let k = 0; k < 42; k++) {
						emoji[i*42+k]?this.emojiData[i].push(
						emoji[i*42+k]
						):''
					}
				}
			}
			
		},
		onLoad(optios) {
			this.article =  this.formatParma(optios.params)
			this.getDetail()
			this.getArticleComments()
			this.InitEmoji(emoji)
			
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
			.detail-comment {
				margin-top: 60rpx;
				.comment-title {
					padding: 20rpx 30rpx;
					font-size: 30rpx;
					color: #666;
					border-bottom: 1rpx #f5f5ff solid;
				}
				.comment-content {
					padding: 0 30rpx;
					width: 95%;
					border: 1rpx #eee solid;
				}
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
			position: relative;
			box-sizing: border-box;
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
			>.popup-content_other{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					>.popup-emoji{
					display: flex;
					justify-content: flex-start;
					padding: 0 10rpx;
					font-size: 24rpx;
					border: 1rpx solid #FFFFFF;
					color: #999999;	
						&.emoji-active{
							border-radius: 10rpx;
							color: #a85050;
							border: 1rpx solid  $base-color;
							box-shadow: inset 0 0 8rpx $base-color;
							transition: all .3s ease-in-out;
							z-index: 10;
						}
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
	
	}

.slider {
	box-sizing: border-box;
    width: 100%;
    height: 288rpx;
	position: absolute;
	bottom: 0;
	left: 0;
    &-emoji {
		box-sizing: border-box;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:center;
        &-icon {
			box-sizing: border-box;
            width: 53%;
            text-align: center;
            padding: 10.5rpx 4rpx;
			font-size: 44rpx;
        }
    }
	
}
.lastbox{
    justify-content: flex-start;
}
</style>
