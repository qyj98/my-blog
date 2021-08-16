<!--
 * @Author: your name
 * @Date: 2021-08-02 21:22:39
 * @LastEditTime: 2021-08-07 01:20:55
 * @LastEditors: Please set LastEditors
 * @Description: 详情页
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\views\Blog\detail.vue
-->

<template>
  <LayOut>
    <div class="detail-container" ref="mainContainer" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <div v-if="!isLoading" class="blog-comment-container">
        <BlogComment />
      </div>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </LayOut>
</template>

<script>
import LayOut from "@/components/LayOut";
import BlogDetail from "@/views/Blog/components/BlogDetail.vue";
import BlogTOC from "@/views/Blog/components/BlogTOC.vue";
import asyncData from "@/mixin/asyncData.js";
import { getBlog } from "@/api/blog.js";
import BlogComment from "./components/BlogComment.vue";
import mainScroll from "@/mixin/mainScroll.js";
import { setTitle } from "@/utills";
export default {
  components: {
    LayOut,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },

  // data() {
  //   return {
  //     data: null,
  //     isLoading: true,
  //   };
  // },
  mixins: [asyncData(null), mainScroll("mainContainer")],
  // async created() {
  //   this.data = await getBlog(this.$route.params.id);
  //   this.isLoading = false;
  //   console.log(this.data,this.$route.params.id);
  // },
  methods: {
    async asyncData() {
      let resp = await getBlog(this.$route.params.id);
      // resp = null; //!测试404
      if (!resp) {
        this.$router.push("/404");
        return;
      }
      if (resp.title) {
        setTitle.setRouteTitle(resp.title);
      }
      return resp;
    },
    // handleScroll() {
    //   // console.log("滚动条变化了");
    //   // 当该页面滚动条滚动后，在事件总线触事件，告诉其他监听该事件的组件该页面滚动了，传递参数：该页面滚动的dom
    //   this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    // },
    // handleScrollToTop(top) {
    //   this.$refs.mainContainer.scrollTop = top;
    // },
  },
  // mounted() {
  //   this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
  //   this.$bus.$on("scrollToTop", this.handleScrollToTop);
  // },
  // beforeDestroy() {
  //   this.$bus.$emit("mainScroll", undefined); //这个页面销毁的时候 在事件总线触发事件 告诉其他监听该事件的组件 该页面滚动的dom已经销毁
  //   this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
  //   this.$bus.$off("scrollToTop", this.handleScrollToTop);
  // },
  // 真实dom渲染完以后 处理页面无法根据hash值跳转的问题
  updated() {
    let hash = location.hash;
    // console.log(hash,this.$route.query,this.$route.params);
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang = "less", scoped>
.detail-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
.blog-comment-container {
  position: relative;
}
.toTopContainer {
  position: fixed;
  right: 25%;
  bottom: 5%;
}
</style>