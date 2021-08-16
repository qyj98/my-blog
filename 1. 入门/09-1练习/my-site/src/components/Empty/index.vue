<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
import Icon from "../Icon/index.vue";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.empty-container {
  .self-center();
  position: absolute;
  font-size: 20px;
  text-align: center;
  color: @gray;
  .icon-container {
    font-size: 70px;
  }
  .text {
    position: relative;
  }
}
</style>
