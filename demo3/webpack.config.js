// webpack 是node 写出来的
//默认文件 weboack.config.js 或者 webpackfile.js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(path.resolve('dist'))  //以当前路径解析出一个绝对路径。
module.exports = {
    mode:'development',
    entry:'./src/index.js' ,// 入口
    output:{
        filename: 'bundle.js', //打包后的文件名
        path:path.resolve(__dirname,'build') // 必须是绝对路径,
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ],
    devServer: { // 开发服务器配置
        contentBase: "./build", // 
        port:3000, // 端口号
        progress: true,  // 进度条
        hot: true, // 热更新
        open:true // 自动打开浏览器
    },
}