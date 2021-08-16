// !wenbpack配置，在生产环境中导出打包结果分析页面，在开发环境中，不导出

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin

if (process.env.NODE_ENV === "production") {
    module.exports = {
        devtool: "none", //!开启现代模式,可以去掉源码地图
        plugins: [new BundleAnalyzerPlugin()],
        externals: { //! 打包时忽略下列的插件
            vue: "Vue", //!告诉weebpack不要打包vue，到时候会提供一个全局变量叫Vue
            vuex: "Vuex",
            "vue-router": "VueRouter",
            axios: "axios",
        }
    }
} else {
    module.exports = {}
}
