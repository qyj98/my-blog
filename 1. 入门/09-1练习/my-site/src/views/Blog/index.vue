<template>
  <div class="blog-container">
    <LayOut>
      <BlogList />
      <template #right>
          <BlogCategroy />
      </template>
    </LayOut>
  </div>
</template>

<script>
import LayOut from "@/components/LayOut";
import BlogList from "./components/BlogList.vue";
import BlogCategroy from "./components/BlogCategroy.vue";
export default {
  components: {
    LayOut,
    BlogList,
    BlogCategroy,
  },
};
</script>

<style>
</style>

