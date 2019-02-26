// webpack webpack-cli 必须同时安装
var path = require("path")
const webpack = require('webpack');//引入webpack
var htmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取CSS webpack4不建议使用
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取CSS webpack4使用
const VueLoaderPlugin = require('vue-loader/lib/plugin')// 处理.vue 文件必须引用这个插件
const ENV =  process.env.NODE_ENV === 'development';// 判断环境变量
console.log(ENV)
let cssLoaders =
module.exports = {
    // 进口文件
    entry: "./src/index.js",
    devtool: ENV ?'inline-source-map' : "",
    // 输出文件
    output: {
        // publicPath:'/dist',//必须加publicPath
        path: path.resolve(__dirname, "dist"),
        filename: "js/js-[name]-[hash].js"
    },
    // 配置模块处理不同文件
    module: {
        // 配置处理规则
        rules: [{
            test: /\.vue$/, // 文件类型
            loader: "vue-loader", // 使用什么loader处理文件
            // options:{
            //     extractCSS: true, 
            //     loaders:{
            //         css: ExtractTextPlugin.extract({
            //             use:  "css-loader",
            //             fallback: 'vue-style-loader',
            //             publicPath:"../"

            //           }),
            //         sass: ExtractTextPlugin.extract({
            //         use:  "sass-loader",
            //         fallback: 'vue-style-loader',
            //         publicPath:"../"

            //         }),
            //     }
            // }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader", "postcss-loader"],
            // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            // use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'), //排除babel解析文件
            include: path.resolve(__dirname, "src") // 指定babel解析文件
        },
         { 
             test: /\.(ttf|eot|svg|woff|woff2)$/, 
             use: 'url-loader' }, // 处理 字体文件的 loader 
        ]

    },
    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        //热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "css/[name][hash].css"                     // 提取出来的css文件路径以及命名
        // }),
    ],
    //开发服务功能
    devServer: {
        contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
        port: 9000, //端口改为9000
        open: true, // 自动打开浏览器，适合懒人
        hot: true,//热加载
        hotOnly: true,
        index: 'index.html'

    }
}