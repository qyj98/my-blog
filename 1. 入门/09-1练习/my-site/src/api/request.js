// !axios获取数据
import axios from 'axios'
import showMessage from '../utills/showMessage'
// 创建一个axios实例 使用拦截器 拦截响应数据 并返回处理后的响应数据
const ins = axios.create()
ins.interceptors.response.use(function (resp) {
    if (resp.data.code !== 0) {
        showMessage({
            content: resp.data.msg,
            type: "error",
        })
        return null;
    }
    return resp.data.data;
})
// 导出实例
export default ins
