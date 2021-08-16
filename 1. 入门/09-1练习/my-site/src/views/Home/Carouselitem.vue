<!--轮播图图片组件-->
<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div class="img-container" ref="image" :style="imgPosition">
      <ImageLoader
        @load="handleLoader"
        :src="carolsel.bigImg"
        :placeholder="carolsel.midImg"
      />
    </div>
    <div ref="title" class="title">{{ carolsel.title }}</div>
    <div ref="desc" class="desc">{{ carolsel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerWidth: 0,
      containerHeight: 0,
      innerWidth: 0,
      innerHeight: 0,
      rect: null,
      mouseLeft: 0,
      mouseTop: 0,
      mouseX: 0,
      mouseY: 0,
      distanceX: 0,
      distanceY: 0,
    };
  },
  computed: {
    imgPosition() {
      // 按照比例拿到相应的left top
      const left = (this.distanceX * this.mouseX) / this.containerWidth;
      const top = (this.distanceY * this.mouseY) / this.containerHeight;
      // console.log(left, top);
      return {
        transform: `translate(-${left}px, -${top}px)`,
      };
    },
  },
  // 需要父组件传递轮播图组件的数据
  props: {
    carolsel: {
      //url属性限定
      require: true, //必传属性
    },
  },
  // 挂载完后
  mounted() {
    // 挂载完后获取真实的标题和描述的dom尺寸数据
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    // console.log( this.titleWidth,this.descWidth);
    // 获取外层容器尺寸
    this.containerWidth = this.$refs.container.clientWidth;
    this.containerHeight = this.$refs.container.clientHeight;
    // 获取图片尺寸数据
    this.innerWidth = this.$refs.image.clientWidth;
    this.innerHeight = this.$refs.image.clientHeight;
    // console.log(this.innerWidth, this.innerHeight);
    // 监听页面变化
    window.addEventListener("resize", this.handleResize);
    // 获取容器与图片的尺寸差
    this.distanceX = this.innerWidth - this.containerWidth;
    this.distanceY = this.innerHeight - this.containerHeight;
    // 初始鼠标位置
    this.mouseX = this.containerWidth / 2;
    this.mouseY = this.containerHeight / 2;
    // console.log(this.mouseX,this.mouseY);
  },
  // 组件销毁后
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    // 图片加载完后展示文字
    handleLoader() {
      this.showWord(this.$refs.title, this.titleWidth, ".1s");
      this.showWord(this.$refs.desc, this.descWidth, "2s");
    },
    // 展示文字
    showWord(dom, width, duration) {
      dom.style.width = 0;
      dom.style.opacity = 1;
      // 提前让浏览器渲染一次，防止宽度直接被下面覆盖没有动画效果
      dom.clientWidth;
      dom.style.width = width + "px";
      dom.style.transition = `2s  ${duration}`;
      // console.log(this.titleWidth,this.descWidth);
    },
    // 鼠标移入时
    handleMousemove(e) {
      this.rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - this.rect.left;
      this.mouseY = e.clientY - this.rect.top;
      // console.log(this.mouseX, this.mouseY);
    },
    // 鼠标移出时
    handleMouseleave() {
      this.mouseX = this.containerWidth / 2;
      this.mouseY = this.containerHeight / 2;
    },
    // 页面尺寸发生变化时重新计算属性
    handleResize() {
      this.containerWidth = this.$refs.container.clientWidth;
      this.containerHeight = this.$refs.container.clientHeight;
      this.innerWidth = this.$refs.image.clientWidth;
      this.innerHeight = this.$refs.image.clientHeight;
      this.rect = this.$refs.container.getBoundingClientRect();
      // console.log(this.innerWidth, this.innerHeight);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  // border: 1px solid red;
  overflow: hidden;
  .img-container {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.5s linear;

    // z-index: -1;
  }
  .desc,
  .title {
    position: absolute;
    left: 5vw;
    color: lighten(@gray, 20%);
    opacity: 0;
    letter-spacing: 3px;
    white-space: nowrap;
    overflow: hidden;
    // 字体描边
    text-shadow: 1px 0 0px rgba(0, 0, 0, 0.5), -1px 0 0px rgba(0, 0, 0, 0.5),
      0 1px 0px rgba(0, 0, 0, 0.5), 0 -1px 0px rgba(0, 0, 0, 0.5);
  }

  .title {
    font-size: 25px;
    top: 50%;
  }
  .desc {
    font-size: 18px;
    top: calc(50% + 50px);
  }
}
</style>