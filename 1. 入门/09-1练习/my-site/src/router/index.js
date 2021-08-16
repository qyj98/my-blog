import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
import setTitle from "@/utills/setTitle";

// !生产环境中由于优化了打包结果使用了cdn，有了全局变量Vuex、vueRouter等因此不能使用下面的代码
// !判断有没有优化打包结果使用cdn引入vueRouter，如果有就存在全局变量vueRouter，就不需要写下面的代码
if (!window.VueRouter) {//!如果当前不是生产环境，就使用下面的代码
    Vue.use(VueRouter)//使用路由插件 导入各个页面
}

const router = new VueRouter({
    // 配置路由(访问路径->页面组件) 命名路由 通过name 获取路径  
    // 使用路由时router会向vue的原型上注入一个对象$route 
    // 动态路由 path中有动态参数:xxx时， 里面的params属性就是动态参数对象 query属性就是？拼接的路径信息
    routes,
    // 匹配模式
    mode: "history",
})

// !导航守卫 页面跳转后 改变网站路由标题
router.afterEach((to, from) => {
    // console.log(to.meta.title);
    if (to.meta.title) {
        setTitle.setRouteTitle(to.meta.title)
    }
})


export default router;
