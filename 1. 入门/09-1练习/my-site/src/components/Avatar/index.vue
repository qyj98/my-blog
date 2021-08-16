<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  /> 
</template>

<script>
export default {
  props: {
    // 设置并输出组件属性
    url: {
      //url属性限定
      type: String, //类型必须是字符串
      require: true, //必传属性
    },
    size: {
      // 设置默认值
      type: Number,
      default: 150,
    },
  },
};
</script>

<style scoped>
/*避免组件间的类样式冲突*/
.avatar-container {
  border-radius: 50%;
  object-fit: cover; /*防止图片拉伸*/
  display: block;
}
</style>