<template>
	<view class="news-page-home">
		<view class="news-page-home__head" ref="homeHead">
			<navBar></navBar>
			<tab :list="labelList" :tabIndex="tabIndex" @update:selected="tabCurrent"></tab>
		</view>
		<view class="news-page-home__list">
			<list :scrollHeight="scrollHeight" :tabList="labelList" :list="articleCacheList" :current="listIndex"
			 @update:current="listCurrent"></list>
		</view>

	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件

	export default {
		data() {
			return {
				labelList: [],
				articleList: [],
				articleCacheList: [],
				tabIndex: 0,
				listIndex: 0,
				scrollHeight: 0
			}
		},
		methods: {
			// #ifdef MP
			getScrollHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.news-page-home__head').boundingClientRect(data => {
					const screenHeight = wx.getSystemInfoSync().windowHeight
					this.scrollHeight = screenHeight - data.height
				}).exec();
			},
			// #endif
			init() {
				let name = '全部'
				this.$api.getLabel()
					.then(res => {
						let {
							data
						} = res
						data.unshift({
							name: '全部'
						})
						this.labelList = data

					})
					.catch(err => console.error(err))
				this.$api.getArticleList({
						name
					})
					.then(res => {
						this.$set(this.articleCacheList, 0, res.data)
					})
					.catch(err => console.error(err))
			},
			listCurrent(res) {
				const {
					name,
					current
				} = res
				this.tabIndex = current
				// 滑动触发
				this.$api.getArticleList({
						name
					})
					.then(res => {
						this.articleCacheList[current] = res.data
						this.$set(this.articleCacheList, current, res.data)
					})
					.catch(err => console.error(err))
			},
			tabCurrent(res) {
				this.listIndex = res.index
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			// #ifdef MP
			this.getScrollHeight()
			// #endif
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.news-page-home {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;

		>.news-page-home__list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
