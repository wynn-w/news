import Vue from 'vue'
import Vuex from 'vuex'
import $api from "../common/api/index.js"

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		labelList: new Array(), //home -> tab
		articleList: new Array(), //home -> list
		index: 0, // home -> tab/list 下标
		load: {} // home -> list -> list-item  记录每个 list-item 的页数与 load-more 组件状态
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
		}
	},
	mutations: {
		setLabel(state, value) {
			state.labelList = Object.assign(value)
		},
		setArticle(state, args) {
			const { data, index } = args
			let old = state.articleList[index] || []
			old.push(...data)
			Vue.set(state.articleList, index, old)
		},
		setIndex(state, value) {
			state.index = value
		},
		setLoad(state, arg) {
			const { index, load } = arg
			Vue.set(state.load, index, load)
		},
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
		async asyncArticle({ commit, state }, arg) {
			let { name, index, page, pageSize } = arg
			let props = {}
			if (!index) { index = 0 }
			if (name) { props = { name, page, pageSize } }
			$api.getArticleList(props)
				.then(res => {
					const { data } = res
					if (data.length === 0) {
						const load = { loading: 'onMore', page:page }
						commit('setLoad', { index, load })
					}else{
					commit('setArticle', { data: res.data, index })
					}
				})
				.catch(err => console.error(err))
		}
	}

});
