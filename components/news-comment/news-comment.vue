<template>
	<view class="comment-wrapper">
		<view class="comment-wrapper__header">
			<view class="comment-wrapper__header-avatar">
				<!-- <image :src="comment.avatar" mode="aspectFill"></image> -->
				<image src="@/static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="comment-wrapper__header-info">
				<view v-if="comment.isReply" class="comment-wrapper__header-info__usr-name">
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
			<view class="comment-wrapper__reply" v-for="item in comment.replys" :key="item.comment_id">
				<news-comment :comment="item" reply @reply="commentReply"></news-comment>
			</view>
		</view>
	</view>
</template>

<script>
	// 递归调用
	import newsComment from "@/components/news-comment/news-comment.vue"; //适配小程序
	import { parseTime } from '@/utils/utils.js';
	export default {
		name: "news-comment",
		components: {
			newsComment
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
		filters: {
			timeFomat(value) {
				return parseTime(value)
			},

		},
		data() {
			return {

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
				// 回复对象为 文章评论 -> 直接传
				this.$emit("reply", content)
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
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.comment-wrapper__header-info__usr-name {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;

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
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}

		}

	}
</style>
