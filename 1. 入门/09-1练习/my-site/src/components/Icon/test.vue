<template>
  <div class="test-container">
    <div class="item" v-for="t in types" :key="t">
      <Icon :type="t" />
      <p>{{ t }}</p>
    </div>
  </div>
</template>

<script>
import Icon, { types } from "./index.vue";
export default {
  components: {
    //组件
    Icon,
  },
  data() {
    return {
      types,
    };
  },
};
</script>

<style scoped>
.icon-font {
  display: block;
}
.item {
  margin: 1em;
  text-align: center;
}
.test-container {
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 580px;
  flex-wrap: wrap;
}
</style>
