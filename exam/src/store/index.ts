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
    getass(state:any, val:any) {
      state.arr = val
      sessionStorage.setItem('ass', val)
      console.log(val);
    },
    getMenu(state:any, val:any) {
      state.menu = val
      console.log(state.menu);
      // sessionStorage.setItem('arr', state.menu)
    },
    getarr(state:any, val:any) {
      state.arr = val
      sessionStorage.setItem('arr', val)
      console.log(val);
    }
  },
  actions: {},
  modules: {},
});
