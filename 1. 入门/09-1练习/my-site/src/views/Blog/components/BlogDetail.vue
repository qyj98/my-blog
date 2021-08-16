<!--
 * @Author: your name
 * @Date: 2021-08-03 23:22:11
 * @LastEditTime: 2021-08-06 21:11:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\views\Blog\components\BlogDetail.vue
-->
<template>
  <div class="blogDetail-container">
    <h1>{{ blog.title }}</h1>
    <div class="info">
      <span>日期:{{ formatDate(blog.createDate) }}</span>
      <span>浏览:{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论:{{ blog.commentNumber }}</a>
      <!-- <a href="">{{ blog.category.name }}</a> -->
      <router-link
        :to="{ name: 'categoryBlog', params: { categoryId: blog.category.id } }"
        >{{ blog.category.name }}</router-link
      >
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from "@/utills/formatDate";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  
  props: {
    blog: {
      type: Object,
      require: true,
    },
  },
  methods: {
    formatDate,
  },
  //   computed: {
  //     getCategoryId() {
  //       return this.blog.name;
  //     },
  //   },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogDetail-container {
  width: 100%;
  margin: 2em;
  .info {
    span,
    a {
      font-size: 12px;
      color: @gray;
      margin-right: 10px;
    }
    a {
      &:hover {
        color: darken(@warn, 10%);
      }
    }
  }
}
</style>>
