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
				<image :src="`https://images.weserv.nl/?url=${article.author.avatar}`" mode="" mode="aspectFill"></image>
			</view>
			<view class="detail__urs-info__content">
				<view class="detail__urs-info__content__urs-name">
					{{article.author.author_name}}
				</view>
				<view class="detail__urs-info__content__article">
					<text>{{article.create_time}}</text>
					<text>{{ article.browse_count}} 浏览</text>
					<text>{{article.thumbs_up_count}} 点赞</text>
				</view>
			</view>
			<button class="detail-urs-info__button" type="default" @click="followAuthor(article.author.id)">
				{{article.is_author_like ? `取消关注`:`关注`}}
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
				<view class="comment-content" v-for="(item,index) in commentList" :key="`${item.comment_id+index.toString()}`" >
					<news-comment :comment="item" @reply="reply"></news-comment>
				</view>
				<uni-load-more v-if=" commentList.length > commentsPageSize || commentList.length === 0 " iconType="snow" :status="loading" :contentText="contentText"></uni-load-more>
			</view>
		</view>

		<!-- 底部控件 -->
		<view class="detail__control">
			<view class="detail__control__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail__control__icons">
				<!-- <view class="detail__control__icons-box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view> -->
				<view class="detail__control__icons-box" @click="addToLike(article._id)">
					<uni-icons :type="article.is_like ? 'heart-filled' : 'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail__control__icons-box" @click="addToThumbs(article._id)">
					<uni-icons :type="article.is_thumbs_up? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
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
					<view :style="{height: `${500 - height}rpx` }"></view>
				</view>
				<view class="popup-content_other">
					<view class="popup-emoji" :class="{'emoji-active':textarea.height != 500}" @click="emojiHandle">
						<image v-if="textarea.height != 500" style="width: 48rpx;height: 48rpx;" src="/static/emoji-c.png" mode="aspectFill"></image>
						<image v-else style="width: 48rpx;height: 48rpx;" src="/static/emoji.png" mode="aspectFill"></image>
					</view>
					<view class="popup-count">{{popupValue.length}}/200</view>
				</view>
				<emoji class="teartextEmoji" ref="emoji" @selectEmoji="emoji"></emoji>
				
			</view>
			
		</uni-popup>
		
	</view>
</template>

<script>
	import uParse from "@/components/gaoyia-parse/parse.vue"
	// import uParse from '@/components/u-parse/u-parse.vue'
	import { mapGetters } from "vuex"
	export default {
		name:"news-detail",
		components: { uParse },
		computed:{
			...mapGetters(['GET_LOGIN', 'GET_AUTH', 'GET_OPENID', 'GET_USER_INFO']),
			height(){
				return this.textarea.height
			}
		},
		data() {
			return {
				article: Object.create({}),
				//user: Object.create({}), //添加登录功能后使用vuex 保存数据
				noData: '<p stye="text-align:center;color:#666">加载中....</p>',
				popupValue:'',
				commentList:[],
				replyProps:{} ,
				replyTo:'',
				textarea:{
					height: 500
				},
				isPass : false, //敏感词检测
				commentsPage: 1,
				commentsPageSize:5,
				isBottom: false, //下拉加载触发两次解决
				loading:'loading', //load more组件状态
				contentText:{contentrefresh: "正在加载...",contentnomore: "没有更多评论了"},
				follow: false,
				canScroll: true
			};
		},
		methods: {
			getDetail() {
				this.$api.getArticleDetail({
					articleId: this.article._id,
					userId: this.GET_USER_INFO._id//当前用户 id ，游客则为空
				}).then(res => {
					const { data } = res
					this.article = Object.assign({}, this.article, data)
				}).catch(err => {
					console.log(err)
				})
			},
			
			/**
			 * 文章/用户相关操作
			 * */ 
			// 关注作者
			async followAuthor(authorId){
				if(!this.GET_USER_INFO._id){
					await this.isULogin()
					if(!this.GET_USER_INFO._id) return
				}
				uni.showLoading();
				this.$api.updateAuthorLikes({
					authorId,
					userId:this.GET_USER_INFO._id
				}).then(res=>{
					uni.hideLoading();
					this.article.is_author_like = !this.article.is_author_like;
					uni.showToast({
						title:this.article.is_author_like?'关注成功':'取消成功',
						icon:'none'
					})
					uni.$emit('updataAuthorLikes')
				}).catch(err=>{
					uni.hideLoading();
				})
			},
			// 文章点赞 -> 点赞为单项事件，不可逆
			async addToThumbs(articleId){
				if(!this.GET_USER_INFO._id){
					await this.isULogin()
					if(!this.GET_USER_INFO._id) return
				}
				uni.showLoading()
				this.$api.updateArticleThumbs({
					articleId,
					userId:this.GET_USER_INFO._id
				}).then(res=>{
					uni.hideLoading();
					this.article.is_thumbs_up=true;
					this.article.thumbs_up_count++;
					uni.showToast({
						title:res.msg
					})
				}).catch(err=>{
					uni.hideLoading();
				})
			},
			// 文章收藏
			async addToLike(articleId){
				if(!this.GET_USER_INFO._id){
					await this.isULogin()
					if(!this.GET_USER_INFO._id) return
				}
				uni.showLoading()
				this.$api.updateArticleLikes({
					articleId,
					userId:this.GET_USER_INFO._id
				}).then(res=>{
					uni.hideLoading()
					this.article.is_like = !this.article.is_like
					uni.showToast({
						title:this.article.is_like ?'收藏成功':'取消收藏',
						icon:'none'
					})
					uni.$emit('updateActicle')
				}).catch(err=>{
					uni.hideLoading();
				})
			},
			
			
			/**
			 *	comment 相关 
			 **/ 
			async openComment(){
				if(!this.GET_USER_INFO._id){
					await this.isULogin()
					if(!this.GET_USER_INFO._id) return
				}
				this.$refs.popup.open()
			},
			closeComment(){
				this.$refs.popup.close()
				this.emojiHandle()
			},
			// 发布评论
			async publishComment(){
				if(!this.GET_USER_INFO._id){
					await this.isULogin()
					if(!this.GET_USER_INFO._id) return
				}
				if(!this.popupValue) {
					uni.showToast({
						title:"请输入评论内容",
						icon:"none"
					})
					return
				}
				uni.showToast({
					icon:"loading",
					title:''
				})
				// await this.$api.checkWords(this.popupValue).then(res=>{
				// 	if(res && res.length === 0 ){
				// 		uni.showToast({
				// 			image:"/static/tRefresh/fail.png",
				// 			title:'当前输入存在敏感词汇'
				// 		})
				// 		uni.hideToast()
				// 		return new Promise((resolve, reject) => {})
				// 	}
				// }).then(()=>{
					this.updateComment({content:this.popupValue,...this.replyProps})
				// }).catch(err=>console.error(err))
			},
			updateComment(arg){
				const data = {
					articleId: this.article._id,
					userId:this.GET_USER_INFO._id,
					...arg
				}
				this.$api.updataComment(data).then(async res=>{
					this.$refs.popup.close()
					await this.getArticleComments(true)
					this.clearCache()
				}).catch(err=>console.error(err))
			},
			// 获取评论
			async getArticleComments(value){
				const isUpdate = value  || false
				await this.$api.getComments({
					articleId: this.article._id,
					page:this.commentsPage,
					pageSize:this.commentsPageSize
				}).then(res=>{
					
					const {data} = res
					
					if(data.length === 0){
						this.commentsPage--
						this.isBottom = true
						this.loading = 'noMore'
						return
					}
					this.isBottom = false
					// 当前操作为评论刷新触发
					if(isUpdate){
						this.commentList = Object.assign([],this.commentList,data)
						uni.showToast({
							title:"评论成功",
							icon:"success"
						})
						return 
					}
					// 触底加载触发
					let old = JSON.parse(JSON.stringify(this.commentList))
					old.push(...data)
					this.commentList=Object.assign([],this.commentList,old)
				}).catch(err=>{
					if(/^20/.test(err.code)){
						uni.showToast({
							title:'遇到点小问题，请刷新后重试',
							icon:'none'
						})
					}else{
						uni.showToast({
							title:err.msg,
							icon:'none'
						})
					}
				})
			},
			// 回复评论
			reply(res){
				this.openComment()
				this.replyProps={
					'commentId' : res.comment.commentId,	 // 被回复评论 ID
					'isReply': res.isReply,					 // 递归组件 标记
					'rootCommentId':res.id
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
			 
			// /**
			//  * 表情包相关
			//  * */
			openEmoji(){
				this.$refs['emoji'] && this.$refs['emoji'].openEmoji()
				this.textarea.height =212
			},
			closeEmoji(){
				this.$refs['emoji'] && this.$refs['emoji'].closeEmoji()
				this.textarea.height =500
			},
			emojiHandle(){
				if(this.textarea.height === 500){
					return this.openEmoji()
				}
				this.closeEmoji()
			},
			emoji(res){
				this.popupValue += res;
			},
			async isULogin(flag) {
				await this.$api.isULogin({ $store: this.$store, currentUrl: this.$mp.page.route })
			}
		},
		async onLoad(optios) {
			this.article =  this.formatParma(optios.params)
			this.getDetail()
			
		},
		onPageScroll(e) {
			if(!this.canScroll) return
			this.canScroll = false
			this.$nextTick(()=>{
				this.getArticleComments()
			})
		},
		onReachBottom(){
			if(this.isBottom)return
			const old  = this.commentsPage
			this.isBottom = true
			this.commentsPage++
			this.getArticleComments()
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
				padding-left: 20rpx;
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

					text:not(:last-child) {
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
					// width: 95%;
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
			>.popup-content{
				
				.popup-textarea{
					width: 100%;
					height: 500rpx;
				}
			}
			
			>.popup-content_other{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding-bottom: 20rpx;
					>.popup-emoji{
						display: flex;
						justify-content: flex-start;
						padding: 0 10rpx;
						font-size: 24rpx;
						color: #999999;	
						&.emoji-active{
							transition: all .3s ease-in-out;
							z-index: 10;
						}
					}
				}
			>.popup-count{
				display: flex;
				justify-content: flex-end;
				padding-bottom: 10rpx;
				font-size: 24rpx;
				color: #999999;
			
			}
			.teartextEmoji{
				position: absolute;
				padding: 0 30rpx;
				bottom: 40rpx;
				left: 0;
			}
			
		}
	
	}

.lastbox{
    justify-content: flex-start;
}
</style>
