// !需要设置路由标题和网站标题，网站标题是需要远程获取的，因此分开设置
let routeTitle = "", siteTitle = "";
function setTitle() {
    if (!routeTitle && !siteTitle) {
        document.title = "loading..."
    }
    else if (routeTitle && !siteTitle) {
        document.title = routeTitle
    }
    else if (!routeTitle && siteTitle) {
        document.title = siteTitle
    }
    else {
        document.title = `${routeTitle}-${siteTitle}`
    }
}
export default {
    // 设置路由标题
    setRouteTitle(title) {
        routeTitle = title;
        setTitle();
    },
    //! 设置网站标题根据数据仓库中远程获取的数据中的siteTitle设置,由于是异步的，因此要等获取到数据以后才能设置
    setSiteTitle(title) {
        siteTitle = title
        setTitle();
    }
}

