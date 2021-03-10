<template>
	<view class="news-tab">
		<scroll-view class="news-tab__srcoll" scroll-x>
			<view class="news-tab__srcoll-box">

				<view v-for=" (item,index) in list" :key="index" 
				@click="clickItem(item,index)" 
				class="news-tab__srcoll__item"
				:class="{active: activeIndex === index}"
				>{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="news-tab__icon">
			<uni-icons type="gear" size="26" color="#8f8f94"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data(){
			return{
				activeIndex : 0
			}
		},
		methods:{
			clickItem(item,index){
				this.activeIndex = index
				this.$emit("update:selected",{data:item,index})
			}
		}
	}
</script>

<style lang="scss">
	.news-tab {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;

		>.news-tab__srcoll {
			display: flex;
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			height: 100%;

			.news-tab__srcoll-box {
				display: flex;
				flex: 1;
				flex-direction: row;
				flex-wrap: nowrap;
				align-items: center;
				box-sizing: border-box;
				height: 45px;

				.news-tab__srcoll__item {
					display: flex;
					padding: 0px 14px;
					font-size: 14px;
					color: #8f8f94;
					flex-shrink: 0;
					box-sizing: border-box;
					&.active{
						color: $base-color;
						transition: all 0.3s ease;
					}
				}
			}

		}

		.news-tab__icon {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 8px;

			&::after {
				position: absolute;
				top: 12px;
				left: 0;
				bottom: 12px;
				left: 0px;
				content: "";
				width: 1px;
				background-color: #c4c4ca;
			}
		}
	}
</style>
