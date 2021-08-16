<template>
  <div
    v-loading="isLoading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <!-- 轮播图图片组件 -->
    <ul
      class="carousel-container"
      @transitionend="handletransitionend"
      :style="{ marginTop }"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carolsel="item" />
      </li>
    </ul>
    <!-- 上下滚动组件 -->
    <div class="arrowUp" v-show="curIndex > 0" @click="switchTo(curIndex - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="arrowDown"
      v-show="curIndex < data.length - 1"
      @click="switchTo(curIndex + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <!-- 指示器组件 -->
    <ul class="indicator">
      <li
        :class="{ active: i == curIndex }"
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
// 导入接口响应数据 遍历数据创建模版
// import { getBanner } from "@/api/banner.js";
import Carouselitem from "./Carouselitem";
import Icon from "@/components/Icon";
// import asyncData from "@/mixin/asyncData.js";
import { mapState } from "vuex";
export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      // 组件混入提取到mixin文件夹
      // banner: {},
      // isLoading : true,
      curIndex: 0, //当前展示的图片索引 控制样式实现轮播
      containerHeight: 0,
      isWheel: false,
    };
  },
  computed: {
    marginTop() {
      return -this.containerHeight * this.curIndex + "px";
    },
    // !首页文字用数据仓库进行获取，不用组件混入
    ...mapState("getBanner", { data: "data", isLoading: "loading" }),
  },
  // 加载远程数据 用组件混入提取到mixin文件夹
  // async created() {
  //   this.banner = await getBanner();
  //   // console.log(this.banner);
  //   this.isLoading = false;
  // },

  // 组件混入调用 需要根据抽离出的响应式数据更改组件中的响应式数据
  // mixins: [asyncData([])],
  created() {
    // !执行数据仓库中的异步操作，获取远程数据
    this.$store.dispatch("getBanner/fetchBanner");
  },

  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    // 监听页面尺寸变化
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 传递给组件混入中配置的方法
    // async asyncData() {
    //   return await getBanner();
    // },
    switchTo(i) {
      this.curIndex = i;
      // console.log(this.curIndex);
    },
    handleWheel(e) {
      if (this.isWheel) {
        return;
      }
      if (e.deltaY > 50 && this.curIndex < this.data.length - 1) {
        this.isWheel = true;
        this.curIndex++;
      }
      if (e.deltaY < -50 && this.curIndex > 0) {
        this.isWheel = true;
        this.curIndex--;
      }
    },
    handletransitionend() {
      this.isWheel = false;
      // console.log("滚动结束");
    },
    handleResize() {
      // console.log("尺寸变化了");
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  @gap: 25px;
  @jump: 20px;

  // test
  // width: 60%;
  // height: 40%;
  // margin: 100px auto;
  // overflow: visible;

  .carousel-container {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .arrowUp,
  .arrowDown {
    .self-row-center();
    color: @gray;
    font-size: 40px;
    cursor: pointer;
  }
  .arrowUp {
    top: @gap;
    animation: moveUp 2s linear infinite;
  }
  .arrowDown {
    bottom: @gap;
    animation: moveDown 2s linear infinite;
  }
  @keyframes moveUp {
    from {
      transform: translateY(0) scale(1.2);
    }
    50% {
      transform: translateY(@jump);
    }
    to {
      transform: translateY(0) scale(1.2);
    }
  }
  @keyframes moveDown {
    from {
      transform: translateY(0) scale(1.2);
    }
    50% {
      transform: translateY(-@jump);
    }
    to {
      transform: translateY(0) scale(1.2);
    }
  }
  .indicator {
    .self-col-center();
    right: @gap;
    li {
      &.active {
        background: #fff;
      }
      cursor: pointer;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      border: 3px solid @gray;
      margin: 10px 0;
    }
  }
}
</style>