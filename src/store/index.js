import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";

Vue.use(Vuex);
const userKeys = "user-token";
export default new Vuex.Store({
  state: {
    user: getLocal(userKeys),
  },
  getters: {},
  mutations: {
    // 修改token 并存储token
    setUser(state, user) {
      state.user = user;
      setLocal(userKeys, user);
    },
  },
  actions: {},
  modules: {},
});
