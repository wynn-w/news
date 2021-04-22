// 导出方法文件

const module = Object.create(null)
const requireJs = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /.js$/
) 	
// 将目录下 .js 文件中导出的方法混入 module，并导出 module
requireJs.keys().forEach(fileName => {
	if(fileName === "./index.js") return 
	Object.assign(module,requireJs(fileName))
})
export default module;