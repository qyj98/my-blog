<!--
 * @Author: your name
 * @Date: 2021-08-04 18:25:36
 * @LastEditTime: 2021-08-06 23:38:42
 * @LastEditors: Please set LastEditors
 * @Description: 博客详情页面的评论模块
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\views\Blog\components\BlogComment.vue
-->

<template>
  <!--  @submit="handleSubmit"注册子组件抛过来的函数和数据 进行处理 -->
  <div class="blog-comment-container">
    <MessageArea
      @submit="handleSubmit"
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import asyncData from "@/mixin/asyncData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [asyncData({})],
  methods: {
    // 分页获取评论（第一页）
    async asyncData() {
      return await getComments(this.page, this.limit, this.$route.params.id);
    },
    // 处理提交评论
    async handleSubmit(formData, callback) {
      // console.log(formData);
      const resp = await postComment({
        ...formData,
        blogId: this.$route.params.id,
      });
      this.data.rows.unshift(resp); //在远程获取的数据[{}{}...]前插入一个数据{} 这和数据通过ajax post请求获取
      this.data.total++;
      callback("评论成功"); //子组件传递的数据处理完毕，告诉子组件让其继续处理（可以给子组件传递相关参数）
    },
    //分页获取评论（下一页）判断是否加载完数据
    hasMore() {
      return this.data.total > this.data.rows.length;
    },
    async asyncMore() {
      if (!this.hasMore()) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.asyncData();
      this.data.rows = this.data.rows.concat(resp.rows);
      this.data.total = resp.total;
      this.isLoading = false;
    },
    handleScroll(scrollDom) {
      // console.log(scrollDom);
      if (!scrollDom) {
        return;
      }
      const range = 100;
      const disc = Math.abs(
        scrollDom.scrollTop + scrollDom.clientHeight - scrollDom.scrollHeight
      );
      if (disc <= range && !this.isLoading) {
        // console.log("到达了底部");
        this.asyncMore();
      }
    },
  },
  created() {
    // 测试
    // window.asyncMore = this.asyncMore;
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style>
</style>
