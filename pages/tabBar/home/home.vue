<template>
	<view class="news-page-home">
		<view class="news-page-home__head" >
			<navBar></navBar>
			<tab :list="GET_LABEL" :tabIndex="index" @update:selected="tabCurrent"></tab>
		</view>
		<view class="news-page-home__list" >
			<list :scrollHeight="scrollHeight" :tabList="GET_LABEL" :list="GET_ARTICLE" :current="index"
			      :load='GET_LOAD' :pageSize="pageSize" @update:current="listCurrent" @loadMore="loadMore"></list>
		</view>

	</view>
</template>

<script>
	// 基于 easyCom 同名组件可直接使用，但是组件为局部组件
	import { mapGetters } from "vuex";
	export default {
		name: "news-tabBar-home",
		computed: {
			...mapGetters(['GET_LABEL', 'GET_ARTICLE', 'GET_INDEX', 'GET_LOAD']),
			index: {
				get() { return this.GET_INDEX },
				set(value) { this.$store.commit('setIndex', value) }
			}
		},
		data() {
			return { scrollHeight: 0, pageSize: 10, isReffresher: false }
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
				this.isLoadInit()
				this.$store.dispatch('asyncLabel')
				this.dispatch_asyncArticle({ name, page: 1, pageSize: this.pageSize })
			},
			// 滑动 list 组件触发
			listCurrent(res) {
				const { name, current } = res
				this.index = current
				this.isLoadInit()
				this.dispatch_asyncArticle({
					name,
					index: current,
					page: this.GET_LOAD[current].page++,
					pageSize: this.pageSize
				})
				// console.log(this.$refs.list.$refs[`aa0`][0]);
			},
			// 点击 tab 组件触发
			tabCurrent(res) {
				const { name } = res.data
				const { index } = res
				this.index = index
				this.isLoadInit()
				this.dispatch_asyncArticle(name, index)
			},
			
			dispatch_asyncArticle(arg) {
				const { index = 0 } = arg
				const list = this.GET_ARTICLE[index]
				if (!list || list.length == 0) {
					this.$store.dispatch('asyncArticle', arg)
				}
			},
			isLoadInit() {
				const index = this.GET_INDEX
				if (!this.GET_LOAD[index] || this.GET_LOAD[index].length === 0) {
					const load = { page: 1, loading: 'loading' }
					this.$store.commit('setLoad', { index, load })
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
		},

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
