<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style lang="less" scoped>
.test-container{
  position: relative;
  width: 300px;
  height: 800px;
  margin: 0 auto;
  border: 2px solid;
}
</style>
