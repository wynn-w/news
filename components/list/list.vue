<template>
	<view class="news-list">
		<scroll-view scroll-y="true" class="news-list__scroll">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
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

		>.news-list__scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
