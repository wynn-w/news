<template>
	<view class="news-page-home">
		<view class="news-page-home__head" ref="homeHead">
			<navBar></navBar>
			<tab :list="GET_LABEL" :tabIndex="index" @update:selected="tabCurrent"></tab>
		</view>
		<view class="news-page-home__list">
			<list :scrollHeight="scrollHeight" :tabList="GET_LABEL" :list="GET_ARTICLE" :current="index" @update:current="listCurrent"></list>
		</view>

	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "tabBar-home",
		computed: {
			...mapActions(['asyncLabel']),
			...mapGetters(['GET_LABEL', 'GET_ARTICLE', 'GET_INDEX']),
			index: {
				get() { return this.GET_INDEX },
				set(value) { this.$store.commit('setIndex', value) }
			}
		},
		data() {
			return { scrollHeight: 0 }
		},
		methods: {
			// #ifdef MP
			// 小程序顶部导航栏高度计算
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
			// 滑动 list 组件触发
			listCurrent(res) {
				const { name, current } = res
				this.index = current
				this.dispatch_asyncArticle(name, current)
			},
			// 点击 tab 组件触发
			tabCurrent(res) {
				const { name } = res.data
				const {
					index
				} = res
				this.index = index
				this.dispatch_asyncArticle(name, index)
			},
			dispatch_asyncArticle(name, index) {
				const list = this.GET_ARTICLE[index]
				if (!list || list.length == 0) {
					this.$store.dispatch('asyncArticle', { name, index })
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
