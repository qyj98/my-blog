import { getAbout } from "@/api/about";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: "",
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchAbout(ctx) {
      //! 数据比较固定，不用重复加载
      if (ctx.state.data) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getAbout();
      ctx.commit("setData", resp);
      ctx.commit("setLoading", false);
    },
  },
};
