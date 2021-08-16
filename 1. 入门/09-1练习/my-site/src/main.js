/*
 * @Author: your name
 * @Date: 2021-07-22 00:27:39
 * @LastEditTime: 2021-08-07 17:33:18
 * @LastEditors: Please set LastEditors
 * @Description: 入口文件
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./styles/global.less"
import "./mock"
import showMessage from "./utills/showMessage"
import "./eventBus";
import store from "./store"

Vue.prototype.$showMessage = showMessage;

Vue.config.productionTip = false

// 注册全局指令 loading效果
import Vloading from "./directives/loading.js"
Vue.directive("loading", Vloading)

// 注册全局指令 懒加载
import Vlazy from "./directives/lazy.js"
Vue.directive("lazy", Vlazy)

// 测试请求
// import * as blogApi from "./api/blog"
// blogApi.getBlogType().then(r => {
//   console.log("博客分类:", r);
// })

// blogApi.getBlogs(2, null, 3).then(r => {
//   console.log("按页获取博客:", r);
// })

// blogApi.getBlog("adadw").then((r) => {
//   console.log("获取单个博客", r);
// })

// blogApi.postComment({
//       nickname: "昵称",
//       content: "评论内容，纯文本",
//       blogId: "123",
//     }).then((r)=>{
//   console.log(r);
// })

// blogApi.getComments("12345").then((r)=>{
//   console.log(r);
// })

// import { getSetting } from "./api/setting"
// getSetting().then((r) => {
//   console.log(r);
// })


new Vue({
  store,//引入vuex插件
  router,//引入页面跳转插件
  render: h => h(App),//app组件渲染。h表示vm.$createElement
}).$mount('#app') //手动挂载


// // 测试事件总线
// import eventBus from "./eventBus";

// // handler1执行函数
// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// // 给event1绑定handler1 handler2
// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler1);

// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;