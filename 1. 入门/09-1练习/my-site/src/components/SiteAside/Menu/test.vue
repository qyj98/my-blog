<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
export default {
  components: {
    Menu,
  },
};
</script>

<style lang="less">
@import "~@/styles/global.less";
.test-container {
  position: absolute;
  width: 400px;
  height: 600px;
  background-color: #000;
  left: 50%;
  transform: translateX(-50%);
}
</style>
