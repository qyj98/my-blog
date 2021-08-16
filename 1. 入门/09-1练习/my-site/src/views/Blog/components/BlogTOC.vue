<!--
 * @Author: your name
 * @Date: 2021-08-03 23:21:53
 * @LastEditTime: 2021-08-07 19:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\views\Blog\components\BlogTOC.vue
-->
<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="list" @selected="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { debounce } from "@/utills";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  methods: {
    handleSelect(item) {
      // console.log(item, location.hash);
      // anchor：数据中html页面包含锚点 id="article-md-title-x"
      location.hash = item.anchor;
      // this.activeAnchor = item.anchor;
    },
    // 为activeAnchor设置锚点值  这个组件监听mainscroll事件 但是用不到该事件传递过来的参数scrollDom（滚动的dom）这里可以不做判断
    setSelected(scrollDom) {
      if (!scrollDom) {
        return;
      }
      // console.log("事件触发了");
      // 清空之前的状态
      this.activeAnchor = "";
      const range = 200;
      for (const dom of this.doms) {
        // 防止dom元素不存在
        if (!dom) {
          continue;
        }
        // 获取dom相对于视口的高度
        const top = dom.getBoundingClientRect().top;
        //dom在范围内
        if (top <= range && top >= 0) {
          this.activeAnchor = dom.id;
          return;
          //dom在范围下面
        } else if (top > range) {
          return;
          //dom在范围上面 锚点定位仍然是该dom，知道下一个dom滚动到范围内，覆盖这里的锚点定位
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  created() {
    // 测试setSelected()
    // window.setSelected = this.setSelected;
    // 监听事件总线上的mianScroll事件  事件处理函数做防抖
    this.debounceSelected = debounce(this.setSelected);
    this.$bus.$on("mainScroll", this.debounceSelected);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.debounceSelected);
  },
  // 处理数据
  computed: {
    // 给toc数组每一项添加一个isSelected属性
    list() {
      // 一定要给默认值，防止数组中的某项没有children属性，无法执行递归
      const addSelect = (toc = []) => {
        return toc.map((r) => ({
          ...r,
          isSelected: this.activeAnchor === r.anchor,
          children: addSelect(r.children), //修改children属性，没有就添加一个，递归遍历children，如果children没有值就遍历默认值[]
        }));
      };
      return addSelect(this.toc);
    },
    //递归 拿到每一个包含锚点的dom
    doms() {
      const doms = [];
      const getDom = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length > 0) {
            getDom(t.children);
          }
        }
      };
      getDom(this.toc);
      return doms;
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
