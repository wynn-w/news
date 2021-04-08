// 敏感词检测
export const checkWords = async function(words) {
	let url = `https://api.menglong.me/sensitive-words`
	return await uni.request({
		url:url,
		method:"POST",
		data:{
			text: words
		},
		header:{
			"Referrer-Policy": "no-referrer",
			"Content-Type":"application/json",
		}
	}).then(res =>res[1].data
	).catch(err=> err)

	// fetch(url,{ method: 'GET',authority: 'api.menglong.me'}).then(res=> {
	// 	return new Promise((reslove, reject) => {
	// 		reslove(res.json())
	// 	})
	// })
}
