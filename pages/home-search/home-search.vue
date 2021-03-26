<template>
	<view class="home-search">
		<navBar isSearch v-model="input" @comfirm="submit" @navBack="back" @clear="inputClear"></navBar>
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
						<view class="label-box__content__item" v-for="(item,index) in GET_SEARCH_HISTORY" :key="index">
							{{item}}
						</view>
					</view>
				</view>
				<view v-else class="no-data"> 没有搜索历史 </view>
			</view>
			<view v-else class="home-search__content">
				<list-scroll :list="GET_SEARCH_LIST"></list-scroll>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
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

				isComfirm: false
			};
		},
		methods: {
			submit(res) {
				const { value } = res
				this.showHeader()
				if (!value) {
					return this.$store.commit('setSearchList', { data: [] })
				}
				this.$store.commit('setSearchHistory', value)
				this.$store.dispatch('asyncSearchList', {value})
			},
			back() {
				this.$store.commit('setInput', '')
				this.hideHeader()
			},
			inputClear(){
				this.showHeader()
			},
			clearHistory() {
				this.$store.commit('clearHistory')
			},
			showHeader() {
				this.isComfirm = true
			},
			hideHeader() {
				this.isComfirm = false
			}
		},

	}
</script>

<style lang="scss">
	page {
		font-size: 14px;
	}

	.home-search {
		display: flex;
		flex-direction: column;
		flex: 1;

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
				}
			}
		}
		.home-search__content{
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
