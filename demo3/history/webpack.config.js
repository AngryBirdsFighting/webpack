// webpack 是node 写出来的
//默认文件 weboack.config.js 或者 webpackfile.js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin') // html模板插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css插件
console.log(path.resolve('dist'))  //以当前路径解析出一个绝对路径。
module.exports = {
    mode:'production',
    entry:'./src/index.js' ,// 入口
    output:{
        filename: 'bundle.[hash:8]js', //打包后的文件名  [hash] 添加hash标记，防止名字相同覆盖
        path:path.resolve(__dirname,'build') // 必须是绝对路径,
    },
    plugins:[ // webpack插件
        new HtmlWebpackPlugin({
            filename: "index.html", // 打包后的页面名称
            template: "index.html", // 模板路径
            inject: true,
            hash:true, // 添加哈希标记
            minify:{
                // removeAttributeQuotes:true, // 删掉html中双引号
                // collapseWhitespace:false, // 打包为一行

            }
        }),
        new MiniCssExtractPlugin({
            filename: "main.css" // 抽离出来的css文件名
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