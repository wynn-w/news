import Vue from 'vue'
import Vuex from 'vuex'
import $api from "../common/api/index.js"

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		labelList: new Array(), //home -> tab
		articleList: new Array(), //home -> list
	},
	getters: {
		GET_LABEL(state) {
			return state.labelList
		},
		GET_ARTICLE(state) {
			return state.articleList
		}
	},
	mutations: {
		setLabel(state, value) {
			state.labelList = Object(value)
		},
		setArticle(state, args) {
			const {data,index} =args
			Vue.set( state.articleList,index,data)
		},
	},
	actions: {
		async asyncLabel({
			commit
		}, arg) {
			$api.getLabel()
				.then(res => {
					let {
						data
					} = res
					data.unshift({
						name: '全部'
					})
					commit('setLabel', data)
				})
				.catch(err => console.error(err))

		},
		async asyncArticle({
			commit
		}, arg) {
			let {
				name,
				index
			} = arg
			let props = {} 
			if (!index) {
				index = 0
			}
			if(name){
				props={name}
			}
			$api.getArticleList(
			props)
				.then(res => {
					commit('setArticle', {
						data: res.data,
						index
					})

				})
				.catch(err => console.error(err))
		}
		// loadmore(){}
	}

});
