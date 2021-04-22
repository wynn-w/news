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
export const updataComment = (data) => {
	return $http({ url: 'updataComment', data })
}
export const getComments = (data) => {
	return $http({ url: 'getComments', data })
}
export const updateAuthorLikes = (data) => {
	return $http({ url: 'updateAuthorLikes', data })
}
export const updateArticleLikes = (data) => {
	return $http({ url: 'updateArticleLikes', data })
}
export const updateArticleThumbs = (data) => {
	return $http({ url: 'updateArticleThumbs', data })
}
export const getArticleLikes = (data) => {
	return $http({ url: 'getArticleLikes', data })
}
export const getAuthorLikes = (data) => {
	return $http({ url: 'getAuthorLikes', data })
}
export const getUserInfo = (data) => {
	return $http({ url: 'getUser', data })
}
export const getUserArticle = (data) => {
	return $http({ url: 'getUserArticle', data })
}
export const updateFeedback = (data) => {
	return $http({ url: 'updateFeedback', data })
}
// 用户登录注册
export const addUser = (data) => {
	return $http({ url: 'addUser', data })
}
export const hasEmail = (data) => {
	return $http({ url: 'hasEmail', data })
}
export const resetPassword = (data) => {
	return $http({ url: 'resetPassword', data })
}