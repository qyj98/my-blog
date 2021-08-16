<template>
  <div class="test-container" ref="container">
    <h1>测试菜单栏</h1>
    <RightList :list="list" @selected="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        {
          name: "标题1",
          isSelected: false,
          children: [
            {
              name: "标题1-1",
              isSelected: false,
              children: [
                { name: "标题1-1-1", isSelected: false },
                { name: "标题1-1-2", isSelected: false },
              ],
            },
            { name: "标题1-2", isSelected: false },
          ],
        },
        {
          name: "标题2",
          isSelected: true,
          children: [
            { name: "标题2-1", isSelected: false },
            { name: "标题2-2", isSelected: false },
            { name: "标题2-3", isSelected: false },
          ],
        },
        { name: "标题3", isSelected: false },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      item.isSelected = true;
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 300px;
}
</style>>

