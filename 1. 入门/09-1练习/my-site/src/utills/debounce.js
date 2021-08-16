/*
 * @Author: your name
 * @Date: 2021-08-05 23:59:28
 * @LastEditTime: 2021-08-06 00:09:04
 * @LastEditors: Please set LastEditors
 * @Description: 防抖
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\utills\debounce.js
 */

// 传递一个函数，用定时器做防抖处理后返回一个新函数 注意传递过来的函数可能有参数
export default function (func, duration = 50) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, duration);
    };
}
