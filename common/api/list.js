import $http from "../http.js"
export const getLabel = (data) => {
	return $http({ url: 'getLabel', data })
}
export const getArticleList = (data) => {
	return $http({ url: 'getArticleList', data })
}
export const getSearch = (data) => {
	return $http({ url: 'getSearch', data })
}
export const getArticleDetail = (data) => {
	return $http({ url: 'getArticleDetail', data })
}
