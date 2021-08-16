/*
 * @Author: your name
 * @Date: 2021-07-29 02:12:52
 * @LastEditTime: 2021-08-07 17:31:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\directives\loading.js
 */
// 配置指令
// el：使用该指令的dom元素  
/*
 *钩子函数 { 
     bind() { 
         // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。 
        },
     inserted(){ 
         // 被绑定元素插入父节点时调用。 
        }, 
     update(){
        // 所在组件的 VNode 更新时调用 
        } 
     componentUpdated(){
        //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        }

     unbind(){
        //只调用一次，指令与元素解绑时调用。
        }
    }
    }
 *
 * bingding：一个对象，描述了指令中提供的信息 其bingding.value值决定了
 * bind()和update()钩子函数的调用情况
 * 
 */

import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less"

function createLoadingDom() {
    const img = document.createElement("img")
    img.src = loadingUrl
    img.className = styles.loadContainer
    img.dataset.name = "loading"
    return img;
}

function getDom(dom) {
    return dom.querySelector("img[data-name=loading]")

}

//当bind()和update()钩子函数的调用情况相同时可简写如下
export default function (el, bingding) {

    // 如果指令信息为true 则添加loadingDom 否则删除
    let curDom = getDom(el);
    // console.log(curDom);
    if (bingding.value) {
        if (!curDom) {
            curDom = createLoadingDom()
            el.appendChild(curDom);
            // console.log("添加了dom");
        }
    }
    else {
        if (curDom) {
            curDom.remove();
            // console.log("移除了dom");
        }
    }
}