<template>
	<view class="zhezhao" v-if="shows" @tap="shows=false">
		<view class="verifyBox" @touchend="onEnd">
			<view class="pintuBox">
				<image :src="'../../static/tfgg-verify/'+img+'.jpg'" class="pintuBg"></image>
			</view>
			<view class="huakuaiBox">
				<view class="yinying" :style="{top:top+'px',left:left+'px'}"></view>
				<movable-area :animation="true">
					<movable-view :x="x" direction="horizontal" @change="onMove">
						<view class="pintukuai" :style="{top:top+'px'}">
							<image :src="'../../static/tfgg-verify/'+img+'.jpg'" :style="{top:-lefttop+'px',left:-left+'px'}"></image>
						</view>
					</movable-view>
				</movable-area>
				<view class="huadao">拖动左边滑块完成上方拼图</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tfgg-verify',
		data() {
			return {
				x: 0, //初始距离
				oldx: 0, //移动的距离
				img: '0', //显示哪张图片
				left: '', //随机拼图的最终X轴距离
				top: '', //拼图的top距离
				lefttop: '', //拼图内容的top距离
				shows: false,
				timer: '', //计时器
				isSuccess: false
			};
		},
		mounted() {
			this.shuaxinVerify()
		},
		methods: {
			//刷新验证
			shuaxinVerify() {
				var gl = Math.random();
				this.left = uni.upx2px(500) * gl > uni.upx2px(250) ? (uni.upx2px(500) * gl) : uni.upx2px(250); //生成随机X轴最终距离
				this.top = -(uni.upx2px(25) + uni.upx2px(343) - (uni.upx2px(263) * gl)); //生成随机Y轴初始距离
				this.lefttop = uni.upx2px(263) * gl; //生成随机Y轴初始距离
				if (gl <= 0.2) {
					this.img = 1
				}
				if (gl > 0.2 && gl <= 0.4) {
					this.img = 2
				}
				if (gl > 0.4 && gl <= 0.6) {
					this.img = 3
				}
				if (gl > 0.6 && gl <= 0.8) {
					this.img = 4
				}
				if (gl > 0.8 && gl <= 1) {
					this.img = 5
				}
			},
			/* 滑动中 */
			onMove(e) {
				this.oldx = e.detail.x;
			},
			/* 滑动结束 */
			onEnd() {
				if (Math.abs(this.oldx - this.left) <= 5) {
					// this.$emit("result", true);
					this.isSuccess = true
					this.hide();
				} else {
					this.shuaxinVerify()
					this.reset()
				}
			},
			/* 重置 */
			reset() {
				this.x = 1;
				this.oldx = 1;
				this.$nextTick(() => {
					this.x = 0;
					this.oldx = 0;
				})
			},
			show() {
				this.shows = true;
			},
			hide() {
				this.shows = false;
				// if (this.timer != '') {
				// 	clearInterval(this.timer)
				// }
			},
			aaa() {
				let time = 3000 // second/10
				return new Promise((resolve, reject) => {
					this.timer = setInterval(() => {
						if (this.isSuccess) {
							this.isSuccess = false
							this.reset()
							clearInterval(this.timer)
							resolve({ ret: 0, msg: '请求成功' })
							return
						}
						if (time <= 0) {
							this.reset()
							this.isSuccess = false
							this.hide()
							clearInterval(this.timer)
							reject({ ret: -1, msg: '请求超时' })
							return
						}
						time -= 1


					}, 100)
				})
			}
		}
	}
</script>

<style>
	.zhezhao {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 999;
	}

	.verifyBox {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 85%;
		background-color: #fff;
		border-radius: 20upx;
		box-shadow: 0 0 5upx rgba(0, 0, 0);
	}

	.pintuBox {
		position: relative;
	}

	.pintuBg {
		width: 610upx;
		height: 343upx;
		display: block;
		margin: 17upx auto;
	}

	.huakuaiBox {
		position: relative;
		height: 80upx;
		width: 610upx;
		margin: 25upx auto;
	}

	.yinying {
		position: absolute;
		width: 80upx;
		height: 80upx;
		background-color: rgba(0, 0, 0, .5);
	}

	.huakuaiBox movable-area {
		height: 80upx;
		width: 100%;
	}

	.huakuaiBox movable-area movable-view {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background-color: #007cff;
		background-image: url(../../static/tfgg-verify/icon-button-normal.png);
		background-repeat: no-repeat;
		background-size: auto 30upx;
		background-position: center;
		position: relative;
		z-index: 100;
	}

	.pintukuai {
		position: absolute;
		top: -105upx;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 101;
		box-shadow: 0 0 5upx rgba(0, 0, 0, .3);
		overflow: hidden;
	}

	.pintukuai image {
		max-width: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 610upx;
		height: 343upx;
	}

	.huadao {
		position: absolute;
		width: calc(100% - 35upx);
		height: 65upx;
		line-height: 65upx;
		background: #eee;
		box-shadow: inset 0 0 5upx #ccc;
		border-radius: 60upx;
		color: #999;
		text-align: right;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		font-size: 36upx;
		padding-right: 35upx;
		z-index: 99;
	}
</style>
