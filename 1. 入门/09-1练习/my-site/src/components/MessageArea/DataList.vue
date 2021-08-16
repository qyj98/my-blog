<!--
 * @Author: your name
 * @Date: 2021-08-04 18:28:32
 * @LastEditTime: 2021-08-05 00:42:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue\1. 入门\09-1练习\my-site\src\components\MessageArea\DataList.vue
-->
<template>
  <div class="data-list-container">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="avatar">
          <Avatar :url="item.avatar" :size="40" />
        </div>
        <div class="aside">
          <div class="nickname">{{ item.nickname }}</div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
        <div class="date">{{ formatDate(item.createDate,true) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import formatDate from "@/utills/formatDate.js";
export default {
  components: {
    Avatar,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-list-container {
  ul {
    list-style: none;
    padding: 0;
    margin: 10px;
    li {
      display: flex;
      padding: 15px 0;
      position: relative;

      border-bottom: 1px solid lighten(@gray, 20%);
      .avatar {
        flex: 0 0 auto;
        padding-right: 15px;
      }
      .aside {
        flex: 1 1 auto;
        .nickname {
          color: darken(@success, 10%);
          padding-bottom: 1em;
          font-weight: bold;
        }
        .content {
          font-size: 14px;
        }
      }
      .date {
        position: absolute;
        right: 0;
        top: 5px;
        font-size: 12px;
        color: @gray;
      }
    }
  }
}
</style>