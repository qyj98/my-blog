// !路由匹配规则 未做分包优化
// import Home from "../views/Home"
// import About from "@/views/About"
// import Project from "@/views/Project"
// import Blog from "@/views/Blog"
// import Message from "@/views/Message"
// import Detail from "@/views/Blog/Detail.vue"

// export default [
//     { name: 'Home', path: "/", component: Home, meta: { title: "首页" } },
//     { name: 'Blog', path: "/article", component: Blog, meta: { title: "文章" } },
//     { name: 'categoryBlog', path: "/article/cate/:categoryId", component: Blog, meta: { title: "文章" } },
//     { name: 'Detail', path: "/article/:id", component: Detail, meta: { title: "文章详情" } },
//     { name: 'Project', path: "/project", component: Project, meta: { title: "项目和效果" } },
//     { name: 'Message', path: "/message", component: Message, meta: { title: "留言板" } },
//     { name: 'About', path: "/about", component: About, meta: { title: "关于我" } },
// ]

// !路由匹配规则 分包优化后， 将路由匹配组件用函数动态引入(引入异步组件)返回一个promise：组件配置对象（路由懒加载，用到这个页面的时候就去加载这个组件） 
import NotFound from "@/views/NotFound.vue";

export default [
    {
        name: 'Home', path: "/",
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
        meta: { title: "首页" }
    },
    {
        name: 'Blog', path: "/article", component: () => import(/* webpackChunkName: "Blog" */ "@/views/Blog"),
        meta: { title: "文章" }
    },
    {
        name: 'categoryBlog', path: "/article/cate/:categoryId", component: () => import(/* webpackChunkName: "Blog" */ "@/views/Blog"),
        meta: { title: "文章" }
    },
    {
        name: 'Detail', path: "/article/:id", component: () => import(/* webpackChunkName: "Detail" */ "@/views/Blog/Detail.vue"),
        meta: { title: "文章详情" }
    },
    {
        name: 'Project', path: "/project", component: () => import(/* webpackChunkName: "Project" */ "@/views/Project"),
        meta: { title: "项目和效果" }
    },
    {
        name: 'Message', path: "/message", component: () => import(/* webpackChunkName: "Message" */ "@/views/Message"),
        meta: { title: "留言板" }
    },
    {
        name: 'About', path: "/about", component: () => import(/* webpackChunkName: "About" */ "@/views/About"),
        meta: { title: "关于我" }
    },
    {//! *:通配符，除了上述路径外，其余路径都指向该组件
        name: '404', path: "*", component: NotFound
    }
];
