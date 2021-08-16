<template>
  <div id="app">
    <h1>app组件</h1>
    <!-- 配置Avatar组件的属性 -->
    <Avatar
      url="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"
    />
    <Avatar
      url="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"
      :size="50"
    />
  </div>
</template>

<script>
import Avatar from "./index.vue";

export default {
  name: "touxiang", //如果组件没有在注册的时候制定名字，则使用这里的名字
  components: { //组件
    Avatar,
  },
};
</script>


