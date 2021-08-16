/*
 * @Author: your name
 * @Date: 2021-08-07 16:40:07
 * @LastEditTime: 2021-08-07 22:16:35
 * @LastEditors: Please set LastEditors
 * @Description: 监听事件总线上滚动条滚动，处理图片懒加载
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\directives\lazy.js
 */

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
 *
 * bingding：一个对象，描述了指令中提供的信息 其bingding.value值决定了
 * bind()和update()钩子函数的调用情况
 * 
 */
import defaultGif from "@/assets/default.gif";
import eventBus from "@/eventBus.js"
import { debounce } from "@/utills"


// 将要处理的图片存在数组中
// let imgs = [{dom,src},{dom,src}];
let imgs = [];

// 设置图片的懒加载，先将所有图片设置成占位图片，判断将出现在视口范围内的图片元素的src设置为真实的src，
function setImgs() {
    for (const img of imgs) {
        img.dom.src = defaultGif
        const dom = img.dom.getBoundingClientRect()
        const clientHeight = document.documentElement.clientHeight;
        let height = dom.height
        if (-dom.top < height && dom.top < clientHeight) {
            img.dom.src = img.realSrc
            imgs = imgs.filter((i) => i !== img) // 除了当前图片，所有图片都保存到数组中， 防止滚动条滚动又要重新遍历该图片
        }
    }
}

function handleMainScroll(dom) {
    if (!dom) {
        return;
    }
    // console.log("滚动了");
    setImgs()
}

// 监听主区域滚动条滚动，滚动后设置图片显示
eventBus.$on("mainScroll", debounce(handleMainScroll, 50))

export default {
    // 由于需要拿到每个绑定了指令的dom元素的尺寸数据getBoundingClientRect，因此这里需要等绑定了指令的dom元素生成并插入父节点后才能获取，使用inserted
    inserted(el, bingding) {
        imgs.push({
            dom: el,
            realSrc: bingding.value
        })
        // 一开始就执行一次，将当前可视区内的图片进行懒加载
        setImgs(imgs)
        // console.log(imgs);
    },
    // 取消绑定的时候（翻页，翻页后会重新执行bind，给img中添加新的img对象）
    // 把旧的img对象(取消绑定的对象)从imgs中删除
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el) 
        // console.log(imgs);
    },
}