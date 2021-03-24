<template>
	<!-- #ifdef MP -->
	<scroll-view scroll-y class="news-list__scroll" :style="{height:`${scrollHeight - 10 }px`}"
	             :refresher-enabled="refresherEnabble" :refresher-triggered="trigger"
	             @refresherrefresh="refresher" @scrolltolower="loadMore">
		<view v-for="(item, index) in listCom" :key="index">
			<list-item :item="item"> </list-item>
		</view>
		<uni-load-more v-if="listCom && listCom.length  > (pageSize -1)" iconType="snow" :status="load[current].loading"></uni-load-more>
		<xuan-popup ref="mpopup" :isdistance="true"></xuan-popup>
	</scroll-view>
	<!-- #endif  -->

	<!-- #ifdef H5 -->
	<scroll-view scroll-y class="news-list__scroll" :style="{height:`100%`}" :refresher-enabled="refresherEnabble"
	             :refresher-triggered="trigger" @refresherrefresh="refresher" @scrolltolower="loadMore">
		<view v-for="(item, index) in listCom" :key="index">
			<list-item :item="item"> </list-item>
		</view>
		<uni-load-more v-if="listCom && listCom.length  > (pageSize -1)" iconType="snow" :status="load[current].loading"></uni-load-more>
		<xuan-popup ref="mpopup" :isdistance="true"></xuan-popup>
	</scroll-view>

	<!-- #endif  -->

</template>

<script>
	export default {
		name: "new-list-scroll",
		props: {
			list: Array,
			current: {
				type: Number,
				default: 0
			},
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
		computed: {
			currentCom() {
				return this.current
			},
			listCom() {
				return this.list
			}
		},
		data() {
			return {
				trigger: false,
				_refresher: false
			}
		},
		methods: {
			loadMore() {
				const index = this.currentCom
				this.$emit('loadMore', { index })
			},
			// 下拉触发
			refresher() {
				if (this._refresher) return; // 解决一次下拉触发两次问题
				this.trigger = true;
				this._refresher = true;
				this.$emit('refresher')
			},
			// 下拉终止
			refresherabort() {
				this.trigger = false;
				this._refresher = false;
			},
			// 外部组件 xuan-popup 弹窗触发 成功事件
			toastSuccess() {
				this.$refs.mpopup.open({
					type: 'success',
					content: '刷新成功！',
					timeout: 1000,
				});
			},
			// 外部组件 xuan-popup 弹窗触发 失败事件
			toastOther() {
				this.$refs.mpopup.open({
					type: 'err',
					content: '遇到一些问题',
					timeout: 1000,
				});
			}

		}
	}
</script>

<style lang="scss">

</style>
