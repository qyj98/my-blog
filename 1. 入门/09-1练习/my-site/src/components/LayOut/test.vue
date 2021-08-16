<template>
  <div class="test-container">
    <LayOut>
        <template #left>
            <div class="left">
                左侧区域
            </div>
        </template>
        <template>
            <div class="main">
                中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域中间区域 中间区域
            </div>
        </template>
        <template #right>
            <div class="right">
            </div>
        </template>
    </LayOut>
  </div>
</template>

<script>
import LayOut from "./";
export default {
  components: {
    LayOut,
  },
};
</script>

<style scoped>
.test-container {
  width: 60%;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;
  white-space: nowrap;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.main {
  width: 100%;
  height: 100%;
  background: lightseagreen;
}
/* .right {
  width: 150px;
  height: 100%;
  background: lightblue;
} */
</style>