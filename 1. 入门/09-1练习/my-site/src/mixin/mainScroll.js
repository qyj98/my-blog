// !监听滚动条滚动，滚动条滚动后向事件总线触发事件传递参数，滚动的dom，
// !toTop向事件总线触发了事件scrollToTop，传递参数dom离顶部的距离，这里监听scrollToTop，进行处理，dom滚动回到该距离


// !!!一定要注意这里的方法不可以与混入的其他组件中的方法重名
export default function (refDom) {
    return {
        mounted() {
            this.$refs[refDom].addEventListener("scroll", this.handleScroll);
            this.$bus.$on("scrollToTop", this.handleScrollToTop);
        },
        beforeDestroy() {
            this.$refs[refDom].removeEventListener("scroll", this.handleScroll);
            this.$bus.$off("scrollToTop", this.handleScrollToTop);
            this.$bus.$emit("mainScroll", undefined);//这个页面销毁的时候 在事件总线触发事件 告诉其他监听该事件的组件 该页面滚动的dom已经销毁
        },
        methods: {
            handleScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refDom]);
            },
            handleScrollToTop(top) {
                this.$refs[refDom].scrollTop = top;
            },
        },
    }
}