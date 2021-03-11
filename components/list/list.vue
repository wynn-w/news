<template>
	<view class="news-list">
		<!-- #ifdef MP -->
		<scroll-view scroll-y class="news-list__scroll" :style="{height:`${scrollHeight}px`}" show-scrollbar>
			<view v-for="(item, index) in list" :key="index">
				<list-item :item="item"> </list-item>
			</view>
		</scroll-view>
		<!-- #endif  -->
		
		<!-- #ifdef H5 -->
		<scroll-view scroll-y class="news-list__scroll" show-scrollbar >
			<view v-for="(item, index) in list" :key="index">
				<list-item :item="item"> </list-item>
			</view>
		</scroll-view>
		<!-- #endif  -->
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			// #ifdef MP 
			placeholder: {
				type: [Number, String], //当前项目环境只定传
			},
			// #endif
		},
		// provide:[placeholder],
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.news-list {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;

		.news-list__scroll {
			// height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
