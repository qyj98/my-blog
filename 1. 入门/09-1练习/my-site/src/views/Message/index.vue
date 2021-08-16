<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getMessages, postMessage } from "@/api/message.js";
import asyncData from "@/mixin/asyncData.js";
import mainScroll from "@/mixin/mainScroll.js";

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
  mixins: [asyncData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  // 获取下一页留言
  created() {
    this.$bus.$on("mainScroll", this.handleNext);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    // 分页获取留言
    async asyncData() {
      return await getMessages(this.page, this.limit);
    },
    async asyncMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.asyncData();
      this.data.rows = this.data.rows.concat(resp.rows);
      this.data.total = resp.total;
      this.isLoading = false;
    },
    handleNext(scrollDom) {
      if (!scrollDom || this.isLoading) {
        return;
      }
      const range = 50;
      const disc = Math.abs(
        //! dom超出顶部的长度 + dom在客户端显示的高度 - dom本身的高度
        scrollDom.scrollTop + scrollDom.clientHeight - scrollDom.scrollHeight
      );
      if (disc <= range && !this.isLoading) {
        // console.log("到达了底部");
        this.asyncMore();
      }
    },
    //! 提交留言 dataDForm组件抛出的事件submit，携带参数:表单数据,回调函数，这个组件注册后执行该函数
    async handleSubmit(formData, callback) {
      const resp = await postMessage(formData);
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("感谢您的留言");
    },
  },
};
</script>

<style lang="less" scoped >
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  .message-area-container {
    width: 750px;
    margin: 0 auto;
  }
}
</style>