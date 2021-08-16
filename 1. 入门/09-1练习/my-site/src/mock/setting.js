// 给banner接口提供模拟的响应数据
// 引入mock
import Mock from "mockjs"

// mock方法，根据请求路径，请求类型，拦截请求 并返回一个模板数据作为响应(模拟服务器返回的数据)
Mock.mock("/api/setting", "get", {
    code: 0, // 错误码
    msg: "请求出错，无数据", // 错误消息
    data: {
        avatar: "https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg",
        siteTitle: "覃尤杰的博客",
        github: "https://github.com/qyj98",
        qq: "1784885676",
        qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        weixin: "destiny2333",
        weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        mail: "duyi@gmail.com",
        icp: "黑ICP备17001719号",
        githubName: "qyj98",
        favicon: "https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg",
    }
})