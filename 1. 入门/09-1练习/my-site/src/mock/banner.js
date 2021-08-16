// 给banner接口提供模拟的响应数据
// 引入mock
import Mock from "mockjs"

// mock方法，根据请求路径，请求类型，拦截请求 并返回一个模板数据作为响应(模拟服务器返回的数据)
Mock.mock("/api/banner", "get", {
    code: 0, // 错误码
    msg: "请求出错，无数据", // 错误消息
    data: [
        {
            id: "1",
            midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
            bigImg: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
            title: "凛冬将至",
            description: "人唯有恐惧的时候方能勇敢",
        },
        {
            id: "2",
            midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
            bigImg: "http://mdrs.yuanjin.tech/img/20201031205551.jpg",
            title: "血火同源",
            description: "如果我回头，一切都完了",
        },
        {
            id: "3",
            midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
            bigImg: "http://mdrs.yuanjin.tech/img/20201031204403.jpg",
            title: "听我怒吼",
            description: "兰尼斯特有债必偿",
        },
    ] // 具体的消息内容，如果code不为0，则必为null
})