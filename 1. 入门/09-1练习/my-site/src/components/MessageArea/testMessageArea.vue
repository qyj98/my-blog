<!--
 * @Author: your name
 * @Date: 2021-08-04 18:47:24
 * @LastEditTime: 2021-08-04 20:38:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\components\MessageArea\testMessageArea.vue
-->

<template>
  <div class="test-container">
    <MessageArea title="评论列表" subTitle="(85)" />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
export default {
  components: {
    MessageArea,
  },
};
</script>

<style lang="less" scoped>

</style>
