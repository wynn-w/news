<template>
	<view class="home-search">
		<navBar isSearch v-model="input" @comfirm="searchList" @inputFocus="inputFocus"></navBar>
		<view class="home-search__header">
			<view v-if="!isComfirm" class="home-search__header__label-box">
				<!-- 标头 -->
				<view class="label-box__header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistory">清空</text>
				</view>
				<!-- 内容 -->
				<view v-if="GET_SEARCH_HISTORY.length > 0" class="label-box__header">
					<view class="label-box__content">
						<view class="label-box__content__item" v-for="(item,index) in GET_SEARCH_HISTORY" :key="index" @click="searchItem(item)" @longtap="showDeleteIcon">
							{{item}}
							<uni-icons v-if="isDelete" class="item__icon-close" type="clear" size="16" color="#f1aaa1" @click.native.stop="deleteItem(item)"></uni-icons>
						</view>
					</view>
				</view>
				<view v-else class="no-data"> 没有搜索历史 </view>
			</view>
			<view v-else class="home-search__content">
				<uni-load-more v-if="isEqureZore" iconType="snow" :status="loading" 
				:contentText="{ contentdown: `上拉显示更多`, contentrefresh: `正在加载...`, contentnomore: `未找到匹配的搜索结果` }"></uni-load-more>
				<list-scroll v-if="!isEqureZore && GET_SEARCH_LIST.length > 0" :list="GET_SEARCH_LIST"></list-scroll>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: 'home-search',
		computed: {
			...mapGetters(['GET_INPUT', 'GET_SEARCH_HISTORY', 'GET_SEARCH_LIST']),
			input: {
				get() {
					return this.$store.state.input
				},
				set(value) {
					this.$store.commit("setInput", value)
				}
			}
		},
		data() {
			return {
				isComfirm: false, //是否已经搜索
				isEqureZore: true, // 搜索结果是否为空
				isDelete: false, //是否显示搜索历史标签的删除符号
				loading: "loading"
			};
		},
		methods: {

			/**
			 * 搜索 相关逻辑
			 * */
			searchList(res) {
				const { value } = res
				this.showHeader()
				this.submit(value)
			},
			searchItem(item) {
				if (this.isDelete) return
				this.showHeader()
				this.submit(item)
				// 回显
				this.input = item
			},
			async submit(value) {
				console.log(1);
				if (!value) {
					this.$store.commit('setSearchList', { data: [] })
					return
				}
				this.$store.commit('setSearchHistory', value)
				// 获取搜索结果
				await this.$store.dispatch('asyncSearchList', { value }).then(res => {
					if (res.isNull) {
						// this.isEqureZore = true
						this.loading = 'noMore'

						return
					}
					this.isEqureZore = false
				})
			},

			/**
			 * 搜索历史 相关逻辑
			 * */
			clearHistory() { this.$store.commit('clearHistory') },
			deleteItem(name) {
				this.isDelete && this.deleteItemHistory(name)
			},
			deleteItemHistory(name) {
				this.$store.commit('deleteHistory', name)
			},
			showDeleteIcon() {
				this.isDelete = true;
				// #ifdef MP-WEIXIN
				wx.vibrateShort({
					success: function() {
						console.log('success');
					}
				})
				// #endif

			},
			showHeader() { this.isComfirm = true },
			hideHeader() { this.isComfirm = false },

			inputFocus() {
				this.hideHeader()
			},

			/**
			 * 页面卸载，重置输入框与搜索结果
			 * */
			unloadHandle() {
				this.$store.commit('setInput', '')
				this.$store.commit('setSearchList', { data: [] })
				this.hideHeader()
			}
		},
		onUnload() {
			this.unloadHandle()
		}
	}
</script>

<style lang="scss">
	page {
		font-size: 28rpx;
		height: 100%;
		background-color: #efeeee;
	}

	.home-search {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: inherit;

		.home-search__header__label-box {
			margin-bottom: 20rpx;

			.label-box__header {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #666;
				padding: 20rpx 30rpx;
				// border-bottom: 1rpx #f5f5f5 solid;

				.label-title {
					color: $base-color;
				}

				.label-clear {
					color: #6ac770;
					font-weight: bold;
				}
			}

			.label-box__content {
				display: flex;
				flex-wrap: wrap;
				padding: 30rpx;
				padding-top: 0;

				.label-box__content__item {
					padding: 4rpx 20rpx;
					margin-top: 24rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
					border: 1rpx #efefef solid;
					font-size: 28rpx;
					position: relative;
					color: #999;
					background-color: #f0f0f0;
					box-shadow: 2rpx 2rpx 4rpx #babecc, -2rpx -2rpx 4rpx #ffffff;

					>.item__icon-close {
						position: absolute;
						right: -12rpx;
						top: -12rpx;
						background-color: #f0f0f0;
						border-radius: 50%;
					}
				}
			}
		}

		.home-search__content {
			padding-top: 20rpx;
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 48rpx;
		color: #999;
	}
</style>
