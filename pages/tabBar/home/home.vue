<template>
	<view class="news-page-home">
		<navBar></navBar>
		<tab :list="labelList"></tab>
	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件

	export default {
		data() {
			return {
				labelList: [],
				articleList: []
			}
		},
		methods: {},
		onLoad() {
			this.$api.getLabel()
				.then(res => this.labelList = res.data)
				.catch(err => console.error(err))
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.news-page-home {
		display: flex;
		flex-direction: column;
	}
</style>
