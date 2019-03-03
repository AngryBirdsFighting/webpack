// webpack 是node 写出来的
//默认文件 weboack.config.js 或者 webpackfile.js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin') // html模板插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css插件, 抽离css并引入到html中， 抽离多个css文件就引用多次
let  OptimizeCss =  require('optimize-css-assets-webpack-plugin') // 压缩css代码
let UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
let webpack = require('webpack')
console.log(path.resolve('dist'))  //以当前路径解析出一个绝对路径。
module.exports = {
    // optimization:{ // 优化项  注意：压缩 css,使用minimizer会自动取消webpack的默认配置，所以记得用UglifyJsPlugin
    //     minimizer:[
    //         new UglifyJsPlugin({
    //             // uglifyOptions:{
    //                 cache:true, // 是否用缓存
    //                 parallel: true, // 是否是并发打包
    //                 sourceMap:true, // 是否需要源码映射，方便更好的调试
    //             // }
    //         }),
    //         new OptimizeCss(),
            
    //     ]
    // },
    mode: 'development', // production or development
    //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object
    entry: ["@babel/polyfill",'./src/index.js'],// 入口
    output: {
        filename: 'bundle.[hash:16].js', //打包后的文件名  [hash] 添加hash标记，防止名字相同覆盖
        path: path.resolve(__dirname, 'dist') // 必须是绝对路径,
    },
    module: {
        // loaders， 多个loaders使用数组
        // loader的顺序默认从右向左执行, 从下到上执行
        // 还可以以对象形式书写，使用options传参时使用
        rules: [
            {
                // css-loader 主要解析@import import 等引用路径
                // style-loader 把css插入到head标签中
                // postcss-loader css兼容性处理 搭配autoprefixer 使用
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader
                    , 'css-loader','postcss-loader']
            },
            {
                // less less -> css
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader
                    , 'css-loader','postcss-loader', 'less-loader']
                },
            {
                test: /\.js$/,
                use: {
                    loader:'babel-loader',
                    //babel配置 可以写到opions里面，也可以写一个babel配置文件
                    ///preset-env 将es6转为es5
                    // plugin-proposal-class-properties 处理class
                    // plugin-proposal-decorators 处理 装饰器@
                    // plugin-transform-runtime  插件会自动polyfill es5不支持的特性，这些polyfill包就是在babel-runtime这个包里
                    options:{ 
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            '@babel/plugin-transform-runtime'
                          ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude:/node_modules/
            }
        ]
    },
    // 通过cnd引入且不用去打包
    externals:{
        jquery: '$'  
    },
    plugins: [ // webpack插件
        new HtmlWebpackPlugin({
            filename: "index.html", // 打包后的页面名称
            template: "index.html", // 模板路径
            inject: true,
            hash: true, // 添加哈希标记
            minify: {
                removeAttributeQuotes: true, // 删掉html中双引号
                collapseWhitespace: true, // 打包为一行

            }
        }),
        // 提起css文件
        new MiniCssExtractPlugin({
            filename: "main.css" // 抽离出来的css文件名
        }),
        // 注入全局变量
        // new webpack.ProvidePlugin({
        //     '$': 'jquery' // 在每个模块中都注入$
        // })
    ],
    
    devServer: { // 开发服务器配置
        contentBase: "./build", // 
        port: 3000, // 端口号
        progress: true,  // 进度条
        hot: true, // 热更新
        open: true // 自动打开浏览器
    },
}