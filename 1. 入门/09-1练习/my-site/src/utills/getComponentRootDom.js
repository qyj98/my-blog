/*
 * @Author: your name
 * @Date: 2021-07-26 01:46:43
 * @LastEditTime: 2021-08-04 17:26:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\utills\getComponentRootDom.js
 */
import Vue from "vue";

/**
	获取某个组件渲染的Dom根元素
*/
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @param {*} comp 组件名
 * @param {*} props 组件需要传递的属性
 * @return {*}
 */
export default function(comp, props) {
  const vm = new Vue({
    render: (h) => h(comp, { props }),
  });
  vm.$mount();
  return vm.$el;
}
