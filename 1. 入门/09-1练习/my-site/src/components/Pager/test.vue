<template>
  <div>
    <h1>App组件</h1>
    <!--注册子组件抛出的事件(pageChange)页码变化  当子组件发生页码变化时通过父组件处理这个事件-->
    <Pager
      :total="total"
      :current="current"
      @pageChange="handlePageChange($event)"
    />
    <!--$event 表示事件参数，添加后表示接收子组件传递的参数  不添加只写函数名也可以接收，如果要配置父组件中的参数需要添加($event,父组件的参数)-->
  </div>
</template>

<script>
import Pager from "./index.vue";
export default {
  components: {
    Pager,
  },
  data() {
    //将子组件的数据拿到父组件中，通过父组件控制子组件数据的变化
    return {
      current: 1,
      total: 202,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>

<style scoped></style>
