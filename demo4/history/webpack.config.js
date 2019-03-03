let path = require("path"), webpack = require("webpack")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let Happypack = require("happypack") // 快乐打包 多线程打包，项目越大效率越高
module.exports = {
    mode:"development",
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    module:{
        // noParse:/jquery/, //对于一些单独的包（没有引用其他第三方包的） 不去解析他的依赖关系 ， 优化打包速度
        rules:[
            {
                test:/.js$/,
                exclude:/node_modules/,// 排除解析目录 优化打包速度
                include:path.resolve('src'),// 指定解析目录 优化打包速度
                use:"happypack/loader?id=js"
            }
        ]
    },
    plugins:[
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),  // 过滤第三方包多余的引用， 如果需要自己手动在js里单个引用
        new HtmlWebpackPlugin({
            template:"./public/index.html",
        }),
        // 引用动态连接库
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "dist", "manifest.json"), // 对应任务清单的名字

        }),
        // 使用多线程打包， 如果css也要使用再new一次
        new Happypack({
            id:"js",
            use:[{
                loader:"babel-loader",
                options:{
                    presets:["@babel/preset-env",'@babel/preset-react'] 
                }
            }]
        })
    ],
    devServer:{
        port:3000,
        open:true,
        contentBase:'./dist/'
    }
}