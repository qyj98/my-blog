<template>
  <div class="imageLoader-container">
    <img
      v-if="showHoldImg"
      class="placeholder"
      :src="placeholder"
      @load="handleLoad"
    />
    <img
      class="img"
      :src="src"
      alt=""
      :style="{
        opacity: showOriImg ? 1 : 0,
        transition: `all ${duration}ms`,
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOriImg: false,//原始图片显示
      showHoldImg: true,//占位图片显示
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  methods: {
    handleLoad() {
      this.showOriImg = true;
      setTimeout(() => {
        this.showHoldImg = false;
        // 图片加载完后给父组件抛出一个事件处理函数：load
        // 父组件可直接注册该函数
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.imageLoader-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
   img {
    .self-fill();
    object-fit: cover;//元素进行保留原始比例的剪切,防止图片变形
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>
