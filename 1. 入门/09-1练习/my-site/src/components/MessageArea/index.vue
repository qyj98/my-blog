<!--
 * @Author: your name
 * @Date: 2021-08-04 18:28:38
 * @LastEditTime: 2021-08-06 03:09:41
 * @LastEditors: Please set LastEditors
 * @Description: messagearea组件 评论消息列表 包含form表单区域和评论列表区域
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\components\MessageArea\index.vue
-->

<template>
  <div class="message-area-container" >
    <!-- v-on="$listeners"表示将子组件抛出的事件和参数原封不动的抛给该组件的父组件 -->
    <DataForm v-on="$listeners"/>
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list"  />
    <!-- 渲染评论之前（父组件传递过来属性值之前）这里显示loading -->
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataForm.vue";
import DataList from "./DataList.vue";

export default {
  components: {
    DataForm,
    DataList,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
  // 
  // methods: {
  //   // 子组件抛出的事件  父组件无法处理，继续往父组件抛
  //   handleSubmit(formData, callback) {
  //     this.$emit("submit", formData, callback);
  //   },
  // },
};
</script>

<style lang="less" scoped>
.message-area-container {
  width: 100%;
  height: 100%;
}
.loading {
  position: relative;
  height: 100px;
}
</style>
