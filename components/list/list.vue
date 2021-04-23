<template>
	<view class="news-list">
		<swiper class="news-list__swiper" @change="change" :current="currentCopy">
			<swiper-item v-for="(item,index) in tabList" :key="index" class="news-list__swiper-wrapper">
				<!-- #ifdef MP -->
				<list-scroll  refresherEnabble :list="list[currentCopy]" :current="currentCopy" :load="load"
				             :pageSize="pageSize" @loadMore="loadMore" @refresher="refresher" :scrollHeight="scrollHeight"></list-scroll>
				<!-- #endif  -->
				<!-- #ifdef H5 -->
				<list-scroll ref="listScroll" refresherEnabble :list="list[currentCopy]" :current="currentCopy"
				             :load="load" :pageSize="pageSize" @loadMore="loadMore" @refresher="refresher"></list-scroll>
				<!-- #endif  -->
			</swiper-item>
		</swiper>
	</view>


</template>

<script>
	export default {
		name:"news-list",
		props: {
			tabList: Array,
			current: {
				type: Number,
				default: 0
			},
			list: Array,
			load: Object,
			pageSize: Number,
			refresherEnabble: {
				type: Boolean,
				default: false
			},
			// #ifdef MP 
			scrollHeight: {
				type: Number
			},
			// #endif
		},
		watch: {
			current(newValue) {
				this.currentCopy = newValue
			}
		},
		data() {
			return { currentCopy: 0 };
		},
		methods: {
			change(e) {
				const current = e.detail.current
				const name = this.tabList[current].name
				this.currentCopy = current
				this.$emit("update:current", {
					name,
					current
				})
			},
			// 上拉加载 
			loadMore(res) {
				const index = this.currentCopy
				if (this.load[index].loading === 'onMore') {
					return;
				}
				this.$store.dispatch('asyncArticle', {
					name: this.tabList[index].name,
					index,
					page: ++this.load[index].page,
					pageSize: this.pageSize,

				})
			},
			// 下拉刷新
			refresher() {
				const index = this.currentCopy
				// #ifdef MP
				const target = this.$children[index]
				// #endif
				// #ifdef H5
				const target = this.$refs.listScroll[index]
				// #endif
				this.$store.dispatch('asyncArticle', {
					name: this.tabList[index].name,
					index: index,
					page: this.load[index].page++,
					pageSize: this.pageSize,
					isRefresh: true //仅在刷新去情况下传递，默认 false
				}).then(res => {
					if (res.code === 200) {
						target.toastSuccess()
						target.refresherabort()
					} else {
						target.toastOther()
					}

				})
			},
			isLoadInit() {
				const index = this.currentCopy
				if (!this.load[index] || this.load[index].length === 0) {
					const load = { page: 1, loading: 'loading' }
					this.$store.commit('setLoad', { index, load })
				}
			}
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
		height: 100%;
		positon: fixed;

		>.news-list__swiper {
			display: flex;
			flex-direction: column;
			flex: 1;
			positon: fixed;

			>.news-list__swiper-wrapper {
				height: 100%;
				overflow: hidden;
				box-sizing: border-box;
				positon: fixed;

				
			}
		}


	}
</style>
