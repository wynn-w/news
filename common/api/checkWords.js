// 敏感词检测
export  const checkWords = async function(words){
	let url = `https://api.menglong.me/sensitive-words?text=${words}`
	return await fetch(url,{ method: 'GET',authority: 'api.menglong.me'}).then(res=> {
		return new Promise((reslove, reject) => {
			reslove(res.json())
		})
	})
}