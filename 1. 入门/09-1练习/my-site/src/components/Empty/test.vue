<template>
  <div class="text-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./index.vue";
export default {
  components: {
    Empty,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";

.text-container {
//   .self-center();
left: 50%;
top: 50%;
transform: translateX(-50%);
  position: relative;
  width: 500px;
  height: 500px;

  border: 1px solid black;
}
</style>
