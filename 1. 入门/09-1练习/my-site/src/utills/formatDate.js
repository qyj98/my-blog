

export default function (timestamp, showAll = false) {
    const date = new Date(+timestamp)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hour = date.getHours().toString().padStart(2, "0")
    const minute = date.getMinutes().toString().padStart(2, "0")
    const second = date.getSeconds().toString().padStart(2, "0")
    if (!showAll) {
        // 将日期中的月份格式设置成显示两位数 
        // 字符串补全长度 padStart(补全后字符串总长度，“在前面补充的字符串”)
        return `${date.getFullYear()}-${month}-${day}`
    } else {
        return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
    }

}