// !首页显示的文字数据
import { getSetting } from "@/api/setting";
import setTitle from "@/utills/setTitle";

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
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSetting()
            ctx.commit("setData", resp)
            ctx.commit("setLoading", false);
            // !设置网站显示图标
            if (resp.favicon) {
                let link = document.querySelector("link[rel='shortcut icon']")
                if (link) {
                    return
                } else {
                    link = document.createElement("link")
                    link.rel = "shortcut icon"
                    link.type = "images/x-icon"
                    link.href = resp.favicon
                    document.querySelector("head").appendChild(link)
                }
            }
            // !设置网站标题根据数据仓库中远程获取的数据中的siteTitle设置,由于是异步的，因此要等获取到数据以后才能设置
            if (resp.siteTitle) {
                setTitle.setSiteTitle(resp.siteTitle)
            }
        }
    }
}