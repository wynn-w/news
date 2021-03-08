// 云函数调用封装
export default function $htttp(options){
	const {url,data} = options
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name:url,
			data
		}).then(res=>{
			if(res.result.code === 200 ){
				reslove(res.result)
			}else{
				reject(res.result)
			}
		})
	})
}