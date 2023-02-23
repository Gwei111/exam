import { isString } from "@vue/shared";
import { createStore } from "vuex";

export default createStore({
  state: {
    menu: [],
    arr: [] || sessionStorage.getItem('arr'),
    ass: []
  },
  getters: {},
  mutations: {
    getass(state, val) {
      state.arr = val
      sessionStorage.setItem('ass', val)
      console.log(val);
    },
    getMenu(state:any, val) {
      state.menu = val
      console.log(state.menu);
      // sessionStorage.setItem('arr', state.menu)
    },
    getarr(state, val) {
      state.arr = val
      sessionStorage.setItem('arr', val)
      console.log(val);
    }
  },
  actions: {},
  modules: {},
});
