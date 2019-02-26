var path = require("path")
var htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js-[id]-[hash].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'), //排除babel解析文件
                include: path.resolve(__dirname, "src") // 指定babel解析文件
            },
            {
                test: /\.css$/, 
                use: ["style-loader", "css-loader?importLoaders=1", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(jpg|png|svg)$/i,
                // loaders:["url-loader?limit=1?name=image/[name]-[hash:5].[ext]", "image-webpack-loader"]
                use: [{
                    loader: "url-loader",
                    query: {
                        limit: 40000,
                        name: "image/[name]-[hash:5].[ext]"
                    }
                },
                {
                    loader: "image-webpack-loader"
                }]

            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ],
    devServer: {
         //设置基本目录结构
         contentBase:path.resolve(__dirname,'dist'),
         //服务器的IP地址，可以使用IP也可以使用localhost
         host:'localhost',
         //服务端压缩是否开启
         compress:false,
         //配置服务端口号
         port:1717
    } //开发服务功能
}