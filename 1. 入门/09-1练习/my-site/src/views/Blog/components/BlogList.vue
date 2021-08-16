<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'Detail',
              params: { id: item.id },
            }"
          >
            <img v-lazy="item.thumb" :title="item.title" :alt="item.title" />
          </RouterLink>
        </div>
        <div class="right">
          <div class="title">
            <RouterLink
              :to="{
                name: 'Detail',
                params: { id: item.id },
              }"
              >{{ item.title }}
            </RouterLink>
          </div>
          <div class="info">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <span>
              <RouterLink
                :to="{
                  name: 'categoryBlog',
                  params: { categoryId: item.category.id },
                }"
                >{{ item.category.name }}
              </RouterLink>
            </span>
          </div>
          <div class="content">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!--//!Page组件emit抛出的函数pageChange包含一个参数newPage为当前页码 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
    <Empty v-if="data.rows.length === 0 && !isLoading" />
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: scroll;
  scroll-behavior: smooth; //平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      border-bottom: 1px solid @gray;
      padding: 10px 0;
      .thumb {
        flex: 0 0 auto;
        img {
          max-width: 200px;
          margin-right: 10px;
        }
      }
      .right {
        flex: 1 1 auto;
        .title {
          font-size: 18px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 40vw;
        }
        .info {
          font-size: 12px;
          color: @gray;
          margin-top: 5px;
          margin-bottom: 20px;
          span {
            padding-right: 20px;
          }
        }
        .content {
          font-size: 14px;
        }
      }
    }
  }
}
</style>


<script>
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utills/index.js";
import Pager from "@/components/Pager";
import asyncData from "@/mixin/asyncData.js";
import mainScroll from "@/mixin/mainScroll.js";
import Empty from "@/components/Empty"
export default {
  components: {
    Pager,
    Empty,
  },
  // data() {
  //   return {
  //     data: {},
  //     isLoading: true,
  //   };
  // },
  computed: {
    // 翻页的时候改变路由信息中的静态参数page
    // 获取路由信息 路由信息发生变化（依赖发生改变） 重新进行计算
    // 计算属性重新计算并不会重新获取数据（响应式数据没有发生变化），页面也不会跳转，需要使用watch监听路由变化并重新获取数据
    /**
     * 使用路由时router会向vue的原型上注入一个对象$route 包含路由信息:动态参数对象pramas，静态参数对象query
     * 动态路由 path中有动态参数:xxx时，
     * 里面的params属性就是动态参数对象 对象属性值为字符串
     * 里面的query属性就是？拼接的静态参数对象  对象属性值为字符串
     *  */
    routeInfo() {
      // 获取路径参数分类id categoryid没有的话就是-1  page limit 一定要转化成Number类型
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return { categoryId, page, limit };
    },
  },
  // async created() {
  // 获取远程数据需要传递参数page limit categoryid
  // this.data = await getBlogs(
  //   this.routeInfo.page,
  //   this.routeInfo.limit,
  //   this.routeInfo.categoryId
  // );
  // this.isLoading = false;
  // console.log(this.routeInfo);
  // },
  mixins: [asyncData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  methods: {
    async asyncData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    // 转换时间戳
    formatDate,
    // 通过this.$router.push 改变地址栏参数
    handlePageChange(newPage) {
      // console.log(newPage);
      const query = {
        // 静态参数提出来
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 改变路由
      /**
       * 没有动态参数的时候
       * this.$router.push 路径为
       * `/artical?page=${newPage}&limit=${this.routeInfo.limit}`
       */
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog", //使用命名路由获取path: "/article" 下面加上路径参数 也可以直接写路径
          query,
          // query: {
          //   page: newPage,
          //   limit: this.routeInfo.limit,
          // }, //静态参数提出去
        });
      } else {
        /**
         * 有动态参数的时候 拼接上动态参数和路径参数
         * this.$router.push 路径为
         * `/artical/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}`
         *  */
        this.$router.push({
          name: "categoryBlog", //使用命名路由获取path: "/article/cate/:categoryid" 下面加上路径参数 替换动态参数
          query,
          // query: {
          //   page: newPage,
          //   limit: this.routeInfo.limit,
          // }, //静态参数提出去
          params: {
            //动态参数
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
    // 该页面滚动条滚动时也需要在事件总线触发事件，传递参数：滚动的dom
    // handleScroll() {
    //   this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    // },
    // handleScrollToTop(top) {
    //   this.$refs.mainContainer.scrollTop = top;
    // },
  },
  // 页面的更新取决于响应式数据的变化
  // 监听路由变化 重新获取数据 更新页面   详细用法看文档22.笔记
  watch: {
    async $route() {
      // console.log("路由变化了");
      this.isLoading = true;
      // 滚动条高度设置成0 防止滚动显示被hidden
      this.$refs.mainContainer.scrollTop = 0;
      // 传递翻页后重新获取数据
      this.data = await this.asyncData();
      this.isLoading = false;
    },
  },
  //
  // mounted() {
  //   this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
  //   this.$bus.$on("scrollToTop", this.handleScrollToTop);
  // },
  // beforeDestroy() {
  //   this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
  //   this.$bus.$off("scrollToTop", this.handleScrollToTop);
  //   this.$bus.$emit("mainScroll", undefined);//这个页面销毁的时候 在事件总线触发事件 告诉其他监听该事件的组件 该页面滚动的dom已经销毁
  // },
};
</script>