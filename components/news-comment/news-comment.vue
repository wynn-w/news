<template>
	<view class="comment-wrapper" :class="{['isReply']:reply}">
		<view class="comment-wrapper__header">

			<view class="comment-wrapper__header-avatar">
				<!-- <image :src="comment.avatar" mode="aspectFill"></image> -->
				<image src="@/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="comment-wrapper__header-info">

				<view v-if="!comment.is_reply" class="comment-wrapper__header-info__usr-name">
					{{comment.author.author_name}}
				</view>
				<view v-else class="comment-wrapper__header-info__usr-name">
					{{comment.author.author_name}} <text class="reply-text">回复</text> {{comment.to}}

				</view>
				<text class="comment-wrapper__header-info__time">{{comment.create_time | timeFomat}}</text>
			</view>
		</view>
		<view class="comment-wrapper__content">
			<!-- 评论文章 -->
			<text>{{comment.comment_content}}</text>
			<view class="comment-wrapper__info">
				<text class="comment-wrapper__info__button" @click="commentReply({comment,isReply:reply})">回复</text>
			</view>
			<view class="comment-wrapper__reply">
				<view class="comment-wrapper__reply-list">
					<news-comment v-if="index < 3 || showAll" v-for="(item,index) in comment.replys" :key="item.comment_id" :comment="item" reply @reply="commentReply"></news-comment>
				</view>
				<view class="comment-wrapper__reply__showAll" v-if="comment.replys.length > 3 && !showAll" @click="showRest">
					共{{ comment.replys.length }}条回复 >
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// 递归调用
	import newsComment from "@/components/news-comment/news-comment.vue"; //适配小程序
	import { parseTime } from '@/utils/utils.js';

	import newsCommentReply from './news-comment-reply.vue'
	export default {
		name: "news-comment",
		components: {
			newsComment,
			newsCommentReply
		},
		props: {
			comment: {
				type: Object,
				required: true,
				default: {}
			},
			// 递归调用
			reply: {
				type: Boolean,
				default: false
			}
		},
		// watch:{
		// 	comment(newvalue){
		// 	console.log(newvalue)
		// 	}
		// },
		filters: {
			timeFomat(value) {
				return parseTime(value)
			},

		},
		data() {
			return {
				showAll: false
			};
		},
		methods: {
			commentReply(content) {
				const { isReply } = content
				// 回复对象为 文章评论的评论的评论 （递归组件的回复）
				if (isReply) {
					content.comment.replyId = content.comment.comment_id // 递归调用传过来的
					content.replyTo = content.comment.author.author_name //被回复的人
				}
				content.replyTo = this.comment.author.author_name //被回复的人
				content.comment.commentId = this.comment.comment_id //当前组件接收父类的
				content.id = this.comment._id //当前组件接收父类的
				// 回复对象为 文章评论 -> 直接传
				this.$emit("reply", content)
			},
			showRest() {
				this.showAll = !this.showAll
			}
		}

	}
</script>

<style lang="scss">
	.comment-wrapper {
		margin: 15px 0;

		.comment-wrapper__header {
			display: flex;

			.comment-wrapper__header-avatar {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-wrapper__header-info {
				display: flex;
				flex-direction: column;
				padding: 0 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.comment-wrapper__header-info__usr-name {
					margin-bottom: 10px;
					font-size: 14px;
					color: #567ec7;

					.reply-text {
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}

		.comment-wrapper__content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comment-wrapper__info {
				margin-top: 15px;
				display: flex;

				.comment-wrapper__info__button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
			}

			.comment-wrapper__reply {
				background-color: #efeeee;
				display: flex;
				flex-direction: column;
				margin: 15px 0;
				.comment-wrapper__reply__showAll{
					padding:0 30rpx 10rpx 30rpx;
					color: #567ec7;
				}
			}

			.comment-wrapper__reply:not(:first-child) {
				// 	// margin-bottom: 0;
				// color: red;
				// 


			}

		}

		&.isReply {
			box-sizing: border-box;
			margin: 0;
			padding: 15px;
			background-color: #efeeee;
			width: 100%;

		}
	}
</style>
