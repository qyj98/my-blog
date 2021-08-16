<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less">
@import "~@/styles/global.less";
.test-container {
  position: absolute;
  width: 400px;
  height: 400px;
  padding-top: 200px;
  background-color: #000;
  left: 50%;
  transform: translateX(-50%);
}
</style>
