<template>
  <div class="site-asite-container" >
    <Avatar
      :url="data.avatar"
      :size="150"
    />
    <p class="introduce">{{data.siteTitle}}</p>
    <Menu />
    <Contact />
    <p class="footer">{{data.icp}}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: {
    ...mapState("settings", ["data"]),
  },
  created() {
    this.$store.dispatch("settings/fetchSetting")
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.site-asite-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: @dark;
  .avatar-container {
    margin: 0 auto;
    padding: 20px 0;
  }
  .introduce {
    text-align: center;
    color: #fff;
  }
}
.footer {
  text-align: center;
  color: darken(@gray, 30%);
  font-size: 14px;
}
</style>
