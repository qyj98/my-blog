<template>
  <nav class="menu-container">
    <!-- 
    //! 用router-link替换a标签，to替换href属性 实现页面切换 
    //! router-link中当前路径与导航路径匹配到会添加router-link-active，精确匹配到会再添加router-link-exact-active
    //!exact属性(bool)：是否要将匹配规则改为：必须要精确匹配才能添加匹配类名router-link-active router-link-exact-active
    //!可通过active-class和exact-active-class属性更改上述类名,当被选中是显示更改后的类名
    -->
    <router-link
      :to="{ name: item.name }"
      :exact="item.exact"
      v-for="item in items"
      :key="item.name"
      active-class="selected"
      exact-active-class=""
    >
      <div>
        <Icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </div>
    </router-link>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true, //激活状态要精确匹配，才添加激活类样式
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, //默认 只要路径以导航路径开头，就添加激活类样式
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  margin: 24px 0;
  a {
    display: block;
    height: 45px;
    padding: 0 50px;
    line-height: 45px;
    color: @gray;
    &:hover {
      color: #fff;
    }
    &.selected {
      background: darken(@words, 3%);
    }
    div {
      i {
        margin-right: 6px;
      }
    }
  }
}
</style>
