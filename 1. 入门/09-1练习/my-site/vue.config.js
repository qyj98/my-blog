
// !vue-cli的配置文件  融合webpack配置
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                // 测试服务器
                target: "http://test.my-site.com"
            },
        }
    },
    //!融合webpack配置 优化
    configureWebpack: require("./webpack.config")
}