<template>
  <div class="about-container" v-loading="loading || iframeLoading">
    <iframe
      v-if="src"
      @load="iframeLoading = false"
      class="about-content"
      :src="src"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    //ifram中根据src加载的网页是否加载中
    return {
      iframeLoading: true,
    };
  },
  computed: {
    ...mapState("about", { src: "data", loading: "loading" }),
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>