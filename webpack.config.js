const fs = require('fs');
const path = require('path')
const process = require('process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const pagePath = "./pages";
const port = 3001;

const config = {
	entry: "/pages/index.js", //入口文件
	mode: process.env.NODE_ENV,  // 环境 development 开发环境   production 生成环境
	output: {
		// library: "ROBIN", // 可以导出模块
		filename: "[name].[hash].js", // 输出文件名称[name] //源文件名 [hash] //打包hash
		// publicPath: "/static",
		// clean: {  // 打包前清空目标目录
		// 	keep: /ignored\/dir\//   //保留某些文件和目录
		// }, // 打包前 清空输出目录 dist
		path: path.resolve(__dirname, "./dist")
	},
	resolve:{
		extensions: ['.js','.jsx']
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		hot: true, //热更新
		compress: true, // 静态资源 开启gzip 压缩
		port, // devserver 启动端口
		// client: {
		// 	logging: 'error'
		// }
	},
	devtool: "eval",
	/**一般设置eval 或者不设置 性能最好. 指定生成source map 的方式  sourcemap 参数表https://webpack.js.org/configuration/devtool/
		"eval",
		"eval-cheap-source-map",
		"eval-cheap-module-source-map",
		"eval-source-map",
		"cheap-source-map",
		"cheap-module-source-map",
		"inline-cheap-source-map",
		"inline-cheap-module-source-map",
		"source-map",
		"inline-source-map",
		"hidden-source-map",
		"nosources-source-map"
		**/

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.less$/i, // 三个loader 都要安装

				// //less-loader
				// 当项目中使用less时需要同时引入less-loader，浏览器不能直接编译less，需要less-loader将less语法转化为css

				// // css-loader
				// css-loader作用是解析css文件的@import和url语句，处理css模块，并将处理的结果以js模块返回

				// // style-loader
				// 经过css-loader的处理，还需要style-loader进行技js的挂载，style-loader的作用是将结果以style的标签方式插入DOM树中

				use: [
					"style-loader",
					"css-loader",
					"less-loader",
				],
			},
		]
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`靓仔你的程序运行在这里 http://localhost:${port}`],
				notes: ['!!!《盘子科技前端组》提醒你! 注意代码规范,提交代码之前多测几遍!  ^_^!']
			},
			onErrors: function (severity, errors) {

			},
			clearConsole: true,
		}),

	]
}

setEntriesAndPlugins();

function setEntriesAndPlugins() {

	const pages = fs.readdirSync(pagePath);
	const entries = {}

	pages.forEach(page => {
		entries[page] = `./pages/${page}/${page}.js`
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: `${page}.html`,
				title: page,
				template: path.resolve(__dirname, `./pages/${page}/${page}.html`),
				chunks: [page],
				inject: true,
			})
		)
	})
	config.entry = entries;
}


module.exports = config;