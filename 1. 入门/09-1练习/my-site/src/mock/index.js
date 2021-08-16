// 由于缺少测试服务器 使用mock模拟数据  需要mock模拟的接口就引入  不需要的就不引入
import "./banner.js"
import "./blog.js"
import "./setting"
import "./about"
import "./project"
import "./message"
import Mock from "mockjs"
// 定义延迟1000-2000ms
Mock.setup({
    timeout: '1000-2000'
})

