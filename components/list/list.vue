<template>
	<view class="news-list">
		<swiper class="news-list__swiper" @change="change" :current="currentCopy">
			<swiper-item v-for="(item,index0) in tabList" :key="index0" class="news-list__swiper-wrapper">
				<!-- #ifdef MP -->
				<scroll-view scroll-y class="news-list__scroll" :style="{height:`${scrollHeight - 10 }px`}"
				             show-scrollbar @scrolltolower="loadMore">
					<view v-for="(item, index) in artList[currentCopy]" :key="index">
						<list-item :item="item"> </list-item>
					</view>
					<uni-load-more v-if="artList[currentCopy] && artList[currentCopy].length  > (pageSize -1)" iconType="snow"
					               :status="load[currentCopy].loading"></uni-load-more>
				</scroll-view>
				<!-- #endif  -->

				<!-- #ifdef H5 -->
				<scroll-view scroll-y class="news-list__scroll" :style="{height:`100%`}" show-scrollbar
				             @scrolltolower="loadMore">
					<view v-for="(item, index) in artList[currentCopy]" :key="index">
						<list-item :item="item"> </list-item>
					</view>
					<uni-load-more v-if="artList[currentCopy] && artList[currentCopy].length  > (pageSize -1)" iconType="snow"
					               :status="load[currentCopy].loading"></uni-load-more>
				</scroll-view>
				<!-- #endif  -->
			</swiper-item>
		</swiper>

	</view>


</template>

<script>
	export default {
		props: {
			list: Array,
			tabList: Array,
			current: {
				type: Number,
				default: 0
			},
			load: Object,
			pageSize: Number,
			// #ifdef MP 
			scrollHeight: {
				type: [Number, String], //当前项目环境只定传
			},
			// #endif
		},
		computed: {
			artList() {
				return this.list
			}
		},
		watch: {
			current(newValue) {
				this.currentCopy = newValue
			}
		},
		data() {
			return {
				currentCopy: 0,
				length: 0
			};
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
			loadMore() {
				const index = this.currentCopy
				const name = this.tabList[index].name

				this.$emit('loadMore', { name, index })
			}
		},
		mounted() {
			const a = this.artList[this.currentCopy]
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

		>.news-list__swiper {
			display: flex;
			flex-direction: column;
			flex: 1;

			>.news-list__swiper-wrapper {
				height: 100%;
				overflow: hidden;
				box-sizing: border-box;

				.news-list__scroll {
					display: flex;
					flex-direction: column;
					height: 100% !important;
				}
			}
		}


	}
</style>
