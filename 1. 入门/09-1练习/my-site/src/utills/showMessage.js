/*
 * @Author: your name
 * @Date: 2021-07-26 00:31:04
 * @LastEditTime: 2021-08-05 02:18:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\utills\showMessage.js
 */
// 弹窗信息
import styles from "./showMessage.module.less"
import getComponentRootDom from "./getComponentRootDom";
import Icon from "../components/Icon"
/**
 * @name: 
 * @test: test font
 * @msg: 调用可自定义以下属性
 * @param {*} content 消息内容
 * @param {*} type 消息类型 info error success warn
 * @param {*} duration 消失事件
 * @param {*} container 消息框会放在该容器的正中间
 * @return {*}
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "warn";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    const div = document.createElement('div');
    // 获取图标组件dom
    const iconDom = getComponentRootDom(Icon, { type })
    // 将图标dom放入span元素中
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    // 防止container的position为静态的 无法定位
    if (options.container) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative"
        }
    }
    container.appendChild(div)
    // 给不同的消息类型设置不同的类样式
    // console.log(styles);
    // console.log(styles[`message-${type}`]);
    let typeClassName = styles[`message-${type}`]
    div.className = `${styles.message} ${typeClassName}`;
    // 浏览器强行渲染 读取位置 重排  不重拍可以用animation 注意模块消失时间与aimation time一致
    div.clientHeight;
    // 回到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%) translateY(0)`;
    // 向上飘移消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback();
        }, { once: true })
    }, duration);

    // animation方法
    // setTimeout(() => {
    //     div.addEventListener("transitionend", function () {
    //     div.remove();
    //     options.callback && options.callback();
    // }, { once: true })
    // }, duration);
}