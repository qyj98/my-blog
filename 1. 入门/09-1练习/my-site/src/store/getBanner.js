// !首页显示的文字数据
import { getBanner as getBannerData } from "@/api/banner";

export default {
    namespaced: true,
    state: {
        loading: true,
        data: []
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchBanner(ctx) {
            // !当首页数据加载过了，跳转到别的页面又跳转回来，就不重新请求了
            if (ctx.state.data.length) {
                return;
            }
            ctx.commit("setLoading", true);
            const resp = await getBannerData()
            ctx.commit("setData", resp)
            ctx.commit("setLoading", false);
        }
    }
}