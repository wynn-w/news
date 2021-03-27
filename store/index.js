import Vue from 'vue'
import Vuex from 'vuex'
import $api from "../common/api/index.js"

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		labelList: new Array(), //home -> tab
		articleList: new Array(), //home -> list
		index: 0, // home -> tab/list 下标
		load: {}, // home -> list -> list-item  记录每个 list-item 的页数与 load-more 组件状态
		input: '', // home-search 
		searchList: new Array(), // home-search ==> 是否用 set 替换
		searchHistory: uni.getStorageSync("__history") || [] // home-search 
	},
	getters: {
		GET_LABEL(state) {
			return state.labelList
		},
		GET_ARTICLE(state) {
			return state.articleList
		},
		GET_INDEX(state) {
			return state.index
		},
		GET_LOAD(state) {
			return state.load
		},
		GET_INPUT(state) {
			return state.input
		},
		GET_SEARCH_LIST(state) {
			return state.searchList
		},
		GET_SEARCH_HISTORY(state) {
			return state.searchHistory
		}
	},
	mutations: {
		setLabel(state, value) {
			state.labelList = value
		},
		setArticle(state, args) {
			const { data, index, isRefresh } = args
			if (!isRefresh) {
				let old = state.articleList[index] || []
				old.push(...data)
				Vue.set(state.articleList, index, old)
				return
			}
			Vue.set(state.articleList, index, data)
		},
		setIndex(state, value) {
			state.index = value
		},
		setLoad(state, arg) {
			const { index, load } = arg
			Vue.set(state.load, index, load)
		},
		setInput(state, value) {
			state.input = value
		},
		setSearchList(state, arg) {
			state.searchList = arg.data
		},
		setSearchHistory(state, value) {
			
			// 对于已有的几率，将其提前到首位；最大长度为 20

			let arr = state.searchHistory
			const index = arr.indexOf(value)
			if (index > 0) {
				arr.splice(index, 1)
			}
			if (arr.length > 19) {
				arr.pop()
			}
			arr.unshift(value)
			uni.setStorageSync('__history', arr)
		},
		// 删除所有搜索历史
		clearHistory(state) {
			uni.removeStorageSync('__history')
			state.searchHistory = []
		},
		// 删除指定搜索记录
		deleteHistory(state, name) {
			let arr = state.searchHistory
			const index = arr.indexOf(name)
			if (index < 0) {
				return console.error(`搜索记录 ‘${name}’ 不存在`)
			}
			arr.splice(index, 1)
			uni.setStorageSync('__history', arr)
		}
	},
	actions: {
		async asyncLabel({ commit }, arg) {
			$api.getLabel()
				.then(res => {
					let { data } = res
					data.unshift({ name: '全部' })
					commit('setLabel', data)
				})
				.catch(err => console.error(err))

		},
		async asyncArticle({ commit }, arg) {
			let { name, index = 0, page, pageSize, isRefresh = false } = arg
			let props = {},
				code
			if (name) { props = { name, page, pageSize } }
			await $api.getArticleList(props)
				.then(res => {
					const { data } = res
					code = res.code
					// data 无数据说明请求到底，改 loadmore 组件状态 为“无更多数据”
					if (data.length !== 0) {
						commit('setArticle', { data, index, isRefresh })
						return
					}
					const load = { loading: 'onMore', page: page }
					commit('setLoad', { index, load })
				})
				.catch(err => console.error(err))
			return new Promise((reslove, reject) => {
				reslove({ code })
			})
		},
		async asyncSearchList({ commit }, arg) {
			let isNull = false
			await $api.getSearch(arg)
				.then(res => {
					const { data } = res
					commit('setSearchList', { data })
					console.log(data.length);
					if (data.length === 0) isNull = true
				})
				.catch(err => console.error(err))
			return new Promise((reslove, reject) => {
				reslove({ isNull })
			})
		},
	}

});
