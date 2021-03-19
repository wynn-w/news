<template>
	<view class="news-page-home">
		<view class="news-page-home__head" ref="homeHead">
			<navBar></navBar>
			<tab :list="GET_LABEL" :tabIndex="tabIndex" @update:selected="tabCurrent"></tab>
		</view>
		<view class="news-page-home__list">
			<list :scrollHeight="scrollHeight" :tabList="GET_LABEL" :list="GET_ARTICLE" :current="listIndex" @update:current="listCurrent"></list>
		</view>

	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件
	import {
		mapActions,
		mapGetters,
		mapMutations
	} from "vuex";
	export default {
		name: "tabBar-home",
		computed: {
			...mapActions(['asyncLabel']),
			...mapGetters(['GET_LABEL', 'GET_ARTICLE'])
		},
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
				const name = '全部'
				this.$store.dispatch('asyncLabel')
				this.dispatch_asyncArticle(name)
			},
			listCurrent(res) {
				const {
					name,
					current
				} = res
				this.tabIndex = current
				// 滑动触发
				this.dispatch_asyncArticle(name, current)
			},
			tabCurrent(res) {
				const {
					name
				} = res.data
				const {
					index
				}=res.index
				this.listIndex = index
				this.dispatch_asyncArticle(name, index)
			},
			dispatch_asyncArticle(name, index) {
				if (!this.GET_ARTICLE[index] || this.GET_ARTICLE[index].length == 0) {

					this.$store.dispatch('asyncArticle', {
						name,
						index
					})
				}
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
