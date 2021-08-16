<!--
 * @Author: your name
 * @Date: 2021-08-06 11:27:06
 * @LastEditTime: 2021-08-07 00:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\components\ToTop\index.vue
-->
<template>
  <div class="to-top-container" @click.prevent="handleClick" v-show="show">
    <Icon type="arrowUp" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleClick() {
    //   console.log("回到顶部");
    // 组件被点击后，在事件总线上触发回到顶部的事件，告诉其他监听该事件的组件滚动条回到顶部，传递参数：滚动条与窗口顶部的距离
      this.$bus.$emit("scrollToTop", 0);
    },
    handleMainScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500 ? true : false;
    },
  },
  mounted() {
    this.$bus.$on("mainScroll", this.handleMainScroll); //监听事件总线上触发mainScroll（滚动条滚动）事件的组件，判断那个组件滚动条是否滚动到目标位置
  },
  beforeDestroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container {
  position: fixed;
  font-size: 80px;
  width: 80px;
  bottom: 40px;
  right: 80px;
  z-index: 1000;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  color: lighten(@gray, 5%);
  &:hover {
    color: @gray;
    transform: scale(1.3);
  }
}
</style>