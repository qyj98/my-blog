<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data.github">
        <Icon type="github" />
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <Icon type="mail" />
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li class="qq-content">
      <div class="qqchart pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <Icon type="qq" />
        <span>{{ data.qq }}</span>
      </a>
    </li>
    <li class="we-content">
      <div class="wechart pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
      <a href="">
        <Icon type="weixin" />
        <span>{{data.weixin}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState("settings", ["data"]),
  },
  created() {
    this.$store.dispatch("settings/fetchSetting");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.contact-container {
  position: relative;
  width: 100%;
  background-color: transparent;
  padding: 20px;
  //   font-size: 14px;
  color: @gray;
  box-sizing: border-box;
  li {
    position: relative;
    margin: 14px 0;
    width: 100%;
    cursor: pointer;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
    a {
      .icon-container {
        font-size: 25px;
        margin-right: 6px;
      }
    }
    .pop {
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      // top: -170px;
      bottom: 30px;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: 0.3s;
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #fff;
        left: 50%;
        bottom: -4px;
        transform: translateX(-50%) rotateZ(45deg);
      }
      img {
        width: 150px;
        height: 150px;
        padding: 10px 15px;
      }
    }
  }
}
</style>
