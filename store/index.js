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
		searchList: {}, // home-search
		historyLists: [] // home-search
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
		}
	},
	mutations: {
		setLabel(state, value) {
			state.labelList = value
		},
		setArticle(state, args) {
			const { data, index, isRefresh } = args
			if (isRefresh) {
				Vue.set(state.articleList, index, data)
			} else {
				let old = state.articleList[index] || []
				old.push(...data)
				Vue.set(state.articleList, index, old)
			}

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
		setSearchList(state, value) {
			state.searchList = value
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
			let { name, index, page, pageSize, isRefresh = false } = arg
			let props = {},
				code
			if (!index) { index = 0 }
			if (name) { props = { name, page, pageSize } }
			await $api.getArticleList(props)
				.then(res => {
					const { data } = res
					code = res.code
					// data 无数据说明请求到底，改 loadmore 组件为“无更多数据”状态
					if (data.length === 0) {
						const load = { loading: 'onMore', page: page }
						commit('setLoad', { index, load })
					} else {
						commit('setArticle', { data, index,isRefresh })
					}
				})
				.catch(err => console.error(err))
			return new Promise((reslove, reject) => {
				reslove({ code })
			})
		},
		async asyncSearchList({ commit }, arg) {
			$api.getSearch(arg)
				.then(res =>
					commit('setSearchList', { data: res.data })
				)
				.catch(err => console.error(err))
		}
	}

});
