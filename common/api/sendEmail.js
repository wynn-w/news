// 邮箱验证码发送与验证
export const sendEmail = async (data)=> {
	return new Promise((reslove,reject)=>{
		 uniCloud.callFunction({
			name: 'emailCode',
			data
		}).then(res=>{
				reslove(res)
		})
	})
}
