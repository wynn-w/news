// 输入框校验
const verification = {
	// 校验的正则和提示语
	verificationReg: {
		'isNull': {
			tip: '此项不能为空',
			reg: /(^\s*)|(\s*$)/g
		},
		// 校验验证码
		'code': {
			tip: '请输入正确的验证码',
			reg: /^\d{6}$/
		},
		// 校验名字
		'name': {
			tip: '请输入4~10位字符',
			reg: /^[\S]{4,10}$/
		},
		'isEmail': {
			tip: '请输入正确的手机号码',
			reg: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
		},
		// 校验密码(由6-16数字和字母组成)
		'isPassword': {
			tip: '请输入(6-16位)数字、字母和英文标点符号组成',
			reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]{6,16}$/
		},
		
    },
	/**
	 * @name:输入框校验方法
	 * @param {name} 校验的正则和提示语名称
	 * @param {value} 输入框的值
	 */
	verificationFuc: (param) => {
		// 获取提示语
		const tip = verification.verificationReg[param.name].tip
		// 获取正则
		const reg = verification.verificationReg[param.name].reg
		// 获取输入框的值
		const value = param.value || ''

		const res = {
			flag: false,
			tip
		}
		const val = value ? reg.test(value) : false
		if (param.name === 'isNull') {
			res.flag = val ? (val.toString().length > 0) : false
		} else {
			res.flag = val || false
		}

		return res
	}
}
export default verification
