<template>

	<swiper class="news-list" @change="change">
		<swiper-item v-for="(item,index0) in tabList" :key="index0" class="news-list__swiper-wrapper">
			<!-- #ifdef MP -->
			<scroll-view scroll-y class="news-list__scroll" :style="{height:`${scrollHeight}px`}" show-scrollbar>
				<view v-for="(item, index) in artList[index]" :key="index">
					<list-item :item="item"> </list-item>
				</view>
			</scroll-view>
			<!-- #endif  -->

			<!-- #ifdef H5 -->
			<scroll-view scroll-y class="news-list__scroll" :style="{height:`100%`}">
				<view v-for="(item, index) in artList[index]" :key="index">
					<list-item :item="item"> </list-item>
				</view>
			</scroll-view>
			<!-- #endif  -->
		</swiper-item>
	</swiper>

</template>

<script>
	export default {
		props: {
			list: Array,
			tabList: Array,
			current: {
				type: [Number, String],
				default: 0
			},
			// #ifdef MP 
			scrollHeight: {
				type: [Number, String], //当前项目环境只定传
			},
			// #endif
		},
		computed: {
			artList() {
				return this.list
			}
		},
		watch:{
			current(newValue){
				this.index = newValue
			}
		},
		data() {
			return {
				index: 0
			};
		},
		methods: {
			change(e) {
				this.index = e.detail.current
				const name = this.tabList[this.index].name
				this.$emit("update:current", {
					name: name,
					current: this.index
				})
			}
		},
	}
</script>

<style lang="scss">
	.news-list {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;

		>.news-list__swiper-wrapper {
			height: 100%;
			overflow: hidden;

			.news-list__scroll {
				display: flex;
				flex-direction: column;
				height: 100% !important;
			}
		}

	}
</style>
