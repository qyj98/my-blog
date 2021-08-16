<!--
 * @Author: your name
 * @Date: 2021-07-22 00:27:38
 * @LastEditTime: 2021-08-06 23:17:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\App.vue
-->
<!--工程根组件-->
//! router-view:当访问路径与router匹配规则匹配后，将匹配的组件放在router-view中
<template>
  <div class="app-container">
    <LayOut>
      <template #left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <router-view></router-view>
      </template>
    </LayOut>
    <ToTop /> 
  </div>
</template>
 

<script>
import LayOut from "@/components/LayOut";
import SiteAside from "@/components/SiteAside";
import ToTop from "@/components/ToTop"
export default {
  components: {
    LayOut,
    SiteAside,
    ToTop,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/global.less";
.app-container {
  .self-fill(fixed);
  .left {
    position: relative;
    width: 250px;
    height: 100%;
  }
}
</style>