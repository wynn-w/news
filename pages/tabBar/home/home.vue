<template>
	<view>
		<navBar></navBar>
		<tab :list="labelList"></tab>
		home page

	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件

	export default {
		data() {
			return {
				labelList: []
			}
		},
		methods: {

		},
		onLoad() {

		}
	}
</script>

<style>

</style>
