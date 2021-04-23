<template>
	<swiper class="emoji" v-if="emojiDataInited" :indicator-dots="true" :current="0">
		<swiper-item v-for="(item, key) in emojiData" :key="key" class="emoji-emoji" :class="[key==emojiData.length-1?'lastbox':'']">
			<text v-for="(emoji, index) in item" :key="index" @click="selectEmoji(emoji)" class="emoji-emoji-icon ">{{ emoji }} </text>
		</swiper-item>
	</swiper>
</template>

<script>
	import emoji from "./emoji.js"
	export default {
		data() {
			return {
				emojiData: [], //表情包数组
				emojiDataInited: false,
			};
		},
		methods: {
			/**
			 * 表情包相关
			 * */
			selectEmoji(m) {
				this.$emit('selectEmoji', m)
			},
			openEmoji() {
				this.emojiDataInited = true
			},
			closeEmoji() {
				this.emojiDataInited = false
			},
			InitEmoji(emoji) {
				let page = Math.ceil(emoji.length / 38);
				for (let i = 0; i < page; i++) {
					this.emojiData[i] = [];
					for (let k = 0; k < 38; k++) {
						emoji[i * 38 + k] ? this.emojiData[i].push(
							emoji[i * 38 + k]
						) : ''
					}
				}
			},
		},
		mounted() {
			this.InitEmoji(emoji)
		}
	}
</script>

<style lang="scss">
	.emoji {
		box-sizing: border-box;
		width:100vw;
		height: 288rpx;

		&-emoji {
			box-sizing: border-box;
			width: 100%;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;

			&-icon {
				box-sizing: border-box;
				width: 53%;
				text-align: center;
				padding: 10.5rpx 4rpx;
				font-size: 44rpx;
			}
		}

	}
</style>
