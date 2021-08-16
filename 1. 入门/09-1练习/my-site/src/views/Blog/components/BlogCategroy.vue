<template>
  <div class="BlogCategory-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @selected="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { getBlogCategory } from "@/api/blog.js";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  async created() {
    // 获取远程数据 没有参数
    this.data = await getBlogCategory();
    this.isLoading = false;
  },
  computed: {
    // 获取路由信息 判断数据是否被选中
    // 处理数据 给数据（数组）添加一个总文章数量对象，并且在每一个对象中添加属性isSelected（是否被选中）和count（显示该分类下的文章总数量）
    
    // 获取路由上的动态参数：categoryId
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    // 获取路由上的静态参数：limit
    limit() {
      return +this.$route.query.limit || 10;
    },
    // 处理后需要传递给组件遍历的数据（数组）
    list() {
      // 获取全部文章总数
      const totalArticle = this.data.reduce((a, b) => a + b.articleCount, 0);
      // console.log(this.data, totalArticle);
      // 数据（数组）增加一项数据：一个对象 "全部"
      const result = [
        { name: "全部", id: -1, articleCount: totalArticle },
        ...this.data,
      ];
      // 给数据（数组）中的每一个对象项添加两个属性isSlected，count
      return result.map((item) => ({
        ...item,
        isSelected: item.id === this.categoryId,
        count: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    handleSelect(item) {
      // console.log(this.list);
      const query = {
        //路径参数提出来
        page: 1,
        limit: this.limit,
      };
      // 改变路由
      /**
       * 没有动态参数的时候
       * this.$router.push 路径为
       * `/artical?page=${newPage}&limit=${this.routeInfo.limit}`
       */
      if (item.id === -1) {
        this.$router.push({
          name: "Blog", //使用命名路由获取path: "/article" 下面加上路径参数
          query, //路径参数
        });
      } else {
        /**
         * 有动态参数的时候 拼接上动态参数和路径参数
         * this.$router.push 路径为
         * `/artical/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}`
         *  */
        this.$router.push({
          name: "categoryBlog", //使用命名路由获取path: "/article/cate/:categoryid" 下面加上路径参数 并且替换动态参数
          query, //路径参数
          params: {
            //动态参数
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style lang = "less" scoped>
.BlogCategory-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>