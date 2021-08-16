import Vue from "vue"
// import Vuex from "vuex" 
import { Store, install } from "vuex"; //!只引入vuex中的数据库 
import getBanner from "./getBanner"
import settings from "./settings"
import about from "./about"
import project from "./project"

// !生产环境中由于优化了打包结果使用了cdn，有了全局变量Vuex、vueRouter等因此不能使用下面的代码
// !判断有没有优化打包结果使用cdn引入Vuex，如果有就存在全局变量Vuex，就不需要写下面的代码
if (!window.Vuex) {//!如果当前不是生产环境，就使用下面的代码
    // Vue.use(Vuex)
    install(Vue);
}
//const store = new Vuex.Store({
const store = new Store({
    strict: true, //!使用严格模式，只允许通过mutations修改仓库数据
    modules: { //!仓库配置分模块，每个模块开启命名空间namespaced
        getBanner,
        settings,
        about,
        project,
    }
})

export default store