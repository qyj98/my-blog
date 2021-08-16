<template>
  <!-- 总页数》1时才显示 -->
  <div class="pager-container">
    <a href="" @click.prevent="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a
      href=""
      @click.prevent="handleClick(current - 1)"
      :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click.prevent="handleClick(n)"
      href=""
      v-for="(n, i) in numberArr"
      :key="i"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>

    <a
      href=""
      @click.prevent="handleClick(current + 1)"
      :class="{ disabled: current === fullPge }"
      >&gt;&gt;</a
    >
    <a
      href=""
      @click.prevent="handleClick(fullPge)"
      :class="{ disabled: current === fullPge }"
      >&gt;&gt;|</a
    >
  </div>
</template>



<script>
export default {
  props: {
    current: {
      //当前页码
      type: Number,
      default: 1,
    },
    total: {
      //总数据量
      type: Number,
      default: 0,
    },
    limit: {
      //页面容量
      type: Number,
      default: 10,
    },
    visibleNumber: {
      //可见页码数
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 总页数
    fullPge() {
      return Math.ceil(this.total / this.limit);
    },
    // 页码显示最小数
    minNum() {
      let min = null;
      min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 页码显示最大数
    maxNum() {
      let max = null;
      max = this.minNum + this.visibleNumber - 1;
      if (max > this.fullPge) {
        max = this.fullPge;
      }
      return max;
    },
    // 显示的页码数组
    numberArr() {
      let num = [];
      for (let i = this.minNum; i <= this.maxNum; i++) {
        num.push(i);
      }
      return num;
    },
  },
  methods: {
    handleClick(newPage) {
      // 防止多次点击 
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.fullPge) {
        newPage = this.fullPge;
      }
      if (this.current === newPage) {
        return;
      }
      // 给父组件抛出一个事件：事件名称(pageChange), 事件参数
      // 可以在父组件中配置注册该事件 控制子组件的变化  需要在父组件中配置子组件参数
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 5px;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
    &:hover {
      color: @success;
    }
  }
}
</style>

