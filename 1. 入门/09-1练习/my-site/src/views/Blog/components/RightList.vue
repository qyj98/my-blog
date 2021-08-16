<!--
 * @Author: your name
 * @Date: 2021-07-29 18:45:29
 * @LastEditTime: 2021-08-07 19:36:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\views\Blog\components\RightList.vue
-->
<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span
        class="nav"
        @click="handleClick(item)"
        :class="{ active: item.isSelected }"
        >{{ item.name }}</span
      >
      <span
        class="count"
        :class="{ active: item.isSelected }"
        v-if="item.count"
        >{{ item.count }}</span
      >
      <RightList :list="item.children" @selected="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  // list数据模版
  // [
  //     {name: xxx,
  //      isSelected:false,
  //      childern: [
  //                 {name:xx , isSelected:false},
  //                 {name:xxx, isSelected:false}
  //                ]
  //     },
  //     {name: xxx, isSelected:false,},
  //     {name: xxx, isSelected:false,},
  // ];
  // 组件递归必须写上组件名称
  name: "RightList",
  props: {
    list: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      // 避免重复选中
      if (!item.isSelected) {
        this.$emit("selected", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.count {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
  line-height: 39px;
}
.nav {
  &:hover,
  &:hover + .count {
    color: @warn;
  }
}
</style>