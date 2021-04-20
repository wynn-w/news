export const isULogin = async (arg) => {
	const { $store: store, currentUrl } = arg
	let islogin = store.state.isLogin

	// #ifdef H5
	const page = window.btoa(encodeURIComponent(JSON.stringify(currentUrl)))
	// #endif

	// #ifdef MP
	wx(store)
	// #endif
	// #ifdef H5
	h5(currentUrl, page)
	return false
	// #endif
}

function h5(currentUrl, page) {
	uni.showModal({
		title: '提示',
		content: '当前还未登录，登录后解锁操作',
		success: function(res) {
			if (res.confirm) {
				uni.navigateTo({
					url: `/pages/login-page/login-page?page=${page}`
				})
			} else if (res.cancel) {
				console.log('取消');
			}
		}
	})
}

async function wx(store) {
	await store.dispatch('wx')
		.then(async res => {
			res.wxAuth()
		}).catch(err => console.error(err))

}
