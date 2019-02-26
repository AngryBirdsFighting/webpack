// hash chunkhash 的区别 hash 每次打包只要有一个改动都会清除缓存重新打包  chunkhash只会重新打包改动过的文件
const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
//const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry:{
        // entry:["./src/index.js","./src/entry.js"] // 平行的多个入口文件打包
       index:"./src/index.js",// 多页面打包
       entry:"./src/entry.js",
       entry1:"./src/entry1.js",
       entry2:"./src/entry2.js"
    }, // 入口
    output:{
        path:path.resolve(__dirname,'dist'), // 相对路劲
        filename:  "js/[name]-[chunkhash].js",// 多页面打包              'main.js' // 单页面打包  
        //publicPath:"http://cdn.com" // 绝对路径
    },// 出口
    module:{}, // 模块
    plugins:[
        new htmlWebpackPlugin({
            template: "index.html", // 生成html 模板
            filename:"entry.html", // 指定生成html 文件名 可以添加hash
            inject:true, // 指定js 脚本位置   参数 head body false true
            title:"entry", // 传参  
            date: new Date(),
            //chunks:["index", "entry"], // 指定加载的压缩文件
            excludeChunks:["entry1", "entry2"], // 制定除了哪些压缩文件剩下的都加载
            minify:{ // 压缩模板
                removeComments:true,  // 删除注释
                collapseWhitespace:false, // 删除空格
            }
        }),
        new htmlWebpackPlugin({
            template: "index.html", // 生成html 模板
            filename:"entry1.html", // 指定生成html 文件名 可以添加hash
            inject:true, // 指定js 脚本位置   参数 head body false true
            title:"entry1", // 传参  
            date: new Date(),
            chunks:[ "entry1"], // 指定加载的压缩文件
            minify:{ // 压缩模板
                removeComments:true,  // 删除注释
                collapseWhitespace:false, // 删除空格
            }
        }),
        new htmlWebpackPlugin({
            template: "index.html", // 生成html 模板
            filename:"entry2.html", // 指定生成html 文件名 可以添加hash
            inject:true, // 指定js 脚本位置   参数 head body false true
            title:"entry2", // 传参  
            date: new Date(),
            chunks:[ "entry2"], // 指定加载的压缩文件
            minify:{ // 压缩模板
                removeComments:true,  // 删除注释
                collapseWhitespace:false, // 删除空格
            }
        })
    ], // 插件
    devServer:{} //开发服务功能
}