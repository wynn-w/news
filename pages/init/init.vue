<template>
	<view class="pc" v-if="!isMobile">
		
		<!-- 手机模拟 -->
		<view class="mobile">
			<view class="mobile_preview_header">
				<i class="mobile_preview_header_icon"></i>
			</view>
			<view class="mobile_preview_frame">
				<view class="content__wrap">
					<image src="/static/url.png" mode="scaleToFill"></image>
					<text>请使用手机浏览器，扫描上方二维码预览。</text>
					<text>PC浏览器，请打开控制台并切换至手机模式后再次刷新浏览。</text>
				</view>
			</view>
			<view class="mobile_preview_footer">
				<i class="mobile_preview_footer_icon"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMobile :  false
			}
		},
		created() {
			const res = uni.getSystemInfoSync();
			if(res.windowWidth >  400){
				this.isMobile = false
				return 
			}
			uni.reLaunch({
				url:'/pages/tabBar/home/home'
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100vw;
		height: 100vh;
	}
	.pc {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background-color: #f8f7f7;

		.mobile {
			display: flex;
			flex-direction: column;
			justify-items: end;
			margin-top: 40rpx ;

			.mobile_preview_header {
				height: 40px;
				width: 387px;
				background: #eeeff2;
				text-align: center;
				line-height: 40px;
				border-top-right-radius: 50px;
				border-top-left-radius: 50px;

				.mobile_preview_header_icon {
					display: inline-block;
					width: 65px;
					height: 10px;
					background: #c8c9cc;
					border-radius: 9px;
					vertical-align: middle;
					margin-top: 18px;
				}
			}

			.mobile_preview_frame {
				width: 375px;
				min-height: 294px;
				height: 667px;
				max-height: calc(100vh - 166px);

				border: 6px solid #eeeff2;
				background-color: #fff;
				display: flex;
			}

			.mobile_preview_footer {
				display: block;
				// position: absolute;
				// bottom: 0;
				// left: 0;
				height: 52px;
				width: 387px;
				background: #eeeff2;
				text-align: center;
				line-height: 45px;
				border-bottom-right-radius: 50px;
				border-bottom-left-radius: 50px;

				.mobile_preview_footer_icon {
					display: inline-block;
					width: 43px;
					height: 43px;
					background: #c8c9cc;
					border-radius: 50%;
					vertical-align: middle;
				}
			}
		}
	}
	.content__wrap{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		box-sizing: border-box;
		padding: 0 20rpx;
		image {
			width: 300rpx;
			height: 300rpx;
		}
		
		text {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-weight: 700;
		}
	}
</style>
