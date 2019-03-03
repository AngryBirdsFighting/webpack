// 创建动态链接库
let path = require("path"), webpack = require("webpack")
module.exports= {
    mode:"development",
    entry:{
        react:['react', 'react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.resolve(__dirname, 'dist'),
        // 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们, 打牌dllPlugin使用
        library:"_dll_[name]",// 配置导出库的名称。
        libraryTarget:"var",// 配置以何种方式导出库。
    },
    plugins:[
        // 生成任务清单
        new webpack.DllPlugin({
            name:"_dll_[name]", //名字要和library同名
            path:path.resolve(__dirname, "dist", "manifest.json")
        })
    ]
}