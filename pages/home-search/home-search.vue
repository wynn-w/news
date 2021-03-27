<template>
	<view class="home-search">
		<navBar isSearch v-model="input" @comfirm="search"></navBar>
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
							<uni-icons v-if="isDelete" class="item__icon-close" type="clear" size="16" color="#f07373" @click.native.stop="deleteItem(item)"></uni-icons>
						</view>
					</view>
				</view>
				<view v-else class="no-data"> 没有搜索历史 </view>
			</view>
			<view v-else class="home-search__content">
				<list-scroll v-if="!isEqureZore && GET_SEARCH_LIST.length > 0" :list="GET_SEARCH_LIST"></list-scroll>
				<!-- TODO: 在没有数据情况下显示，样式需要优化 -->
				<view class="no-data" v-else>
					没找匹配的搜索结果
				</view>
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
				isEqureZore: false, // 搜索结果是否为空
				isDelete: false //是否显示搜索历史标签的删除符号
			};
		},
		methods: {
			
			/**
			 * 搜索 相关逻辑
			 * */
			search(res) {
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
			submit(value) {
				if (!value) {
					this.$store.commit('setSearchList', { data: [] })
					return
				}
				this.$store.commit('setSearchHistory', value)
				this.$store.dispatch('asyncSearchList', { value }).then(res => {
					if (res.isNull) this.isEqureZore = true
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
			showDeleteIcon() { this.isDelete = true },
			showHeader() { this.isComfirm = true },
			hideHeader() { this.isComfirm = false },

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
		font-size: 14px;
		height: 100%;
	}

	.home-search {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: inherit;

		.home-search__header__label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-box__header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-box__content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-box__content__item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					position: relative;

					>.item__icon-close {
						position: absolute;
						right: -12rpx;
						top: -12rpx;
						background-color: #fff;
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
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
