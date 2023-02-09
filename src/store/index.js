import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用来定义公共数据
  state: {
    uname: "",
    job: "",
  },
  getters: {
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  mutations: {
    // 第一个参数 state，后面的参数是数据
    setUname(state, uname) {
      if (uname != null) {
        state.uname = uname
      } else {
        state.uname = ""
      }
    },

    setJob(state, job) {
      if (job != null) {
        state.job = job
      } else {
        state.job = ""
      }
    }
  },
  actions: {
    // context 相当于 Vuex.Store 实例
    setUname(context, uname) {
      context.commit("setUname", uname)
    },
    setJob(context, job) {
      context.commit("setJob", job)
    }
  },
  modules: {
  }
})
