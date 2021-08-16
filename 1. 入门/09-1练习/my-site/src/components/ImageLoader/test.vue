<template>
  <div class="test-container">
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      @load="handleLoaded"
    />
  </div>
</template>

<script>
import ImageLoader from "./index.vue";
export default {
  name: "ImgLoader",
  components: {
    //组件
    ImageLoader,
  },
  methods: {
    handleLoaded() {
      console.log("ImageLoader组件load事件触发，图片加载完成");
    },
  },
};
</script>

<style lang="less" scoped>
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
.right {
  width: 150px;
  height: 100%;
  background: lightblue;
}
</style>
